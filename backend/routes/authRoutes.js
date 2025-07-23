const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes

const{
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login
router.get('/getUser', protect , getUserInfo); // Route to get user information

router.post("/upload-image",upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;