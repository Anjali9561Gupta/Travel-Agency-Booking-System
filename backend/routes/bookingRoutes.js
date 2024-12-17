const express = require('express');
const router = express.Router();
const { createBooking, getAllPackages , downloadInvoice} = require('../controllers/bookingController');

// GET all bookings (admin route to view all bookings)
router.get('/admin/bookings', getAllPackages); 

// POST create a new booking
router.post('/', createBooking); 
router.get('/download-invoice/:invoiceId', downloadInvoice);


module.exports = router;
