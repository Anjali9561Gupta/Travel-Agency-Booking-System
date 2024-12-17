const Package = require('../models/packageModel');


// Get all packages with pagination and search/filter functionality
const getAllPackages = async (req, res) => {
  const { page = 1, limit = 10, title, minPrice, maxPrice } = req.query;
  try {
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };

    const packages = await Package.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Package.countDocuments(query);

    res.status(200).json({ total, page: parseInt(page), limit: parseInt(limit), packages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get package by ID
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new package
const addPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error });
  }
};

// Update an existing package
const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package', error });
  }
};


// Delete Package
const deletePackage = (req, res) => {
  const packageId = req.params.id;
  console.log("Deleting package with ID:", packageId);  // Log the package ID

  Package.findByIdAndDelete(packageId)
    .then((deletedPackage) => {
      if (!deletedPackage) {
        return res.status(404).send({ message: 'Package not found' });
      }
      console.log('Package deleted');
      res.status(200).send({ message: 'Package deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting package:', error);
      res.status(500).send({ message: 'Error deleting package', error: error.message });
    });
};





module.exports = { getAllPackages, getPackageById, addPackage, updatePackage, deletePackage };
