const express = require('express');
const router = express.Router();
const Package = require('../models/packageModel'); // Import the model

// Add a new package
router.post('/packages', async (req, res) => {
    try {
        const { title, description, price, availableDates, image } = req.body;

        const newPackage = new Package({
            title,
            description,
            price,
            availableDates,
            image,
        });

        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add package', error });
    }
});

module.exports = router;
