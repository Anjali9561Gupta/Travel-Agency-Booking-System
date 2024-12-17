const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Ensure the invoices directory exists
const ensureInvoicesDirectory = () => {
  const dirPath = path.join(__dirname, '../invoices');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const getAllPackages = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
  try {
    const packages = await Package.find()
      .skip((page - 1) * limit) 
      .limit(parseInt(limit)); 
    const total = await Package.countDocuments();

    res.status(200).json({ 
      total, 
      page: parseInt(page), 
      limit: parseInt(limit), 
      packages 
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new booking and generate invoice
const createBooking = async (req, res) => {
  try {
    const { packageId, name, email, phone, travelers, specialRequests } = req.body;

    // Fetch the package to calculate the price
    const packageDetails = await Package.findById(packageId);
    if (!packageDetails) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = packageDetails.price * travelers;

    // Create the booking
    const booking = new Booking({
      packageId,
      name,
      email,
      phone,
      travelers,
      specialRequests,
      totalPrice,
    });

    await booking.save();

    // Ensure the invoices directory exists
    ensureInvoicesDirectory();

    // Generate and save invoice as a PDF file
    const invoicePath = path.join(__dirname, '../invoices', `invoice-${booking._id}.pdf`);
    generateInvoice(booking, packageDetails, invoicePath);

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      invoice: invoicePath,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Generate Invoice and save it to file
const generateInvoice = (booking, packageDetails, invoicePath) => {
  try {
    // Ensure the invoices directory exists
    const invoiceDir = path.dirname(invoicePath);
    if (!fs.existsSync(invoiceDir)) {
      console.log('Invoices directory does not exist, creating it...');
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const doc = new jsPDF();

    // Invoice Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Travel Agency Invoice', 10, 10);

    // Customer Details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Customer Name: ${booking.name}`, 10, 30);
    doc.text(`Email: ${booking.email}`, 10, 40);
    doc.text(`Phone: ${booking.phone}`, 10, 50);

    // Package Details
    doc.text(`Package: ${packageDetails.title}`, 10, 70);
    doc.text(`Number of Travelers: ${booking.travelers}`, 10, 80);
    doc.text(`Price per Person: $${packageDetails.price}`, 10, 90);
    doc.text(`Total Price: $${booking.totalPrice}`, 10, 100);

    // Special Requests (if any)
    if (booking.specialRequests) {
      doc.text(`Special Requests: ${booking.specialRequests}`, 10, 110);
    }

    // Generate the PDF as ArrayBuffer
    const pdfOutput = doc.output('arraybuffer');
    
    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(pdfOutput);

    // Log the path to ensure it's correct
    console.log('Saving invoice to:', invoicePath);

    // Save invoice as a PDF file
    fs.writeFileSync(invoicePath, buffer);

    console.log(`Invoice saved successfully at ${invoicePath}`);
  } catch (err) {
    console.error('Error generating invoice:', err);
  }
};


// Download Invoice
const downloadInvoice = (req, res) => {
  const { invoiceId } = req.params;
  const invoicePath = path.join(__dirname, '../invoices', `invoice-${invoiceId}.pdf`);

  // Check if file exists before attempting to send it
  if (fs.existsSync(invoicePath)) {
    res.contentType("application/pdf");
    res.sendFile(invoicePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading invoice');
      }
    });
  } else {
    res.status(404).send('Invoice not found');
  }
};

module.exports = { createBooking, getAllPackages , downloadInvoice };

