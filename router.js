const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const packageController = require('./controllers/packageController');
const hotelController = require('./controllers/hotelController');
const BookingController = require('./controllers/BookingController');
const preferenceController = require('./controllers/preferenceController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


const handleFileUploadError = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed.', error: err.message });
        }
        next();
    });
};

router.get('/packages/:id', packageController.getPackage);
router.get('/packages', packageController.getPackages);
router.post('/packages', handleFileUploadError, packageController.addPackage);
router.delete('/packages/:id', packageController.deletePackage);
router.put('/packages/:id', upload.single('image'), packageController.updatePackage);

router.post('/hotels', handleFileUploadError, hotelController.addHotel);
router.get('/hotels', hotelController.getHotels);
router.get('/hotels/:id', hotelController.getHotel);
router.delete('/hotels/:id', hotelController.deleteHotel);
router.put('/hotels/:id', upload.single('image'), hotelController.updateHotel);

router.post('/signup', userController.register);
router.post('/login', userController.login);


router.post('/bookings', BookingController.addBooking);
router.get('/bookings', BookingController.getBookings);
router.put('/bookings/:id', BookingController.updateBookingStatus);
router.delete('/bookings/:id', BookingController.deleteBooking); 


router.post('/preferences', preferenceController.savePreference);

module.exports = router;
