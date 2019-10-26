const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController.js');
const RejectionController = require('./controllers/RejectionController.js');

const router = Router();
const upload = multer(uploadConfig);

router.get('/health', (req, res) => res.json({ message: "I'm alive!" }));

router.post('/sessions', SessionController.store);

router.get('/spots', SpotController.index);
router.post('/spots', upload.single('thumbnail'), SpotController.store);

router.get('/dashboard', DashboardController.show);

router.post('/spots/:spot_id/bookings', BookingController.store);

router.post('/bookings/:booking_id/approvals', ApprovalController.store);
router.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = router;
