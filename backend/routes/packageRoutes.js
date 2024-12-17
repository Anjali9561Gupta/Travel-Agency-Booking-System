const express = require('express');
const { getAllPackages, getPackageById, addPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const adminAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.post('/admin', adminAuth, addPackage);
router.put('/admin/packages/${updatedPackage._id}', adminAuth, updatePackage);
router.delete('/admin/packages/${id}', adminAuth, deletePackage);  

module.exports = router;

