const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');

// Import Routes
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes'); 

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); 

// Routes
app.use('/api/packages', packageRoutes); 
app.use('/api/bookings', bookingRoutes); 
app.use('/api/admin', adminRoutes); // Admin routes (protected with authentication)


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.get('/download-invoice/:invoiceId', (req, res) => {
  const { invoiceId } = req.params;
  const invoicePath = path.join(__dirname, 'invoices', `invoice-${invoiceId}.pdf`);

  res.sendFile(invoicePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error downloading invoice');
    }
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
