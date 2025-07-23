const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1h' });// Token will expire in 1hr
    };

    //regiter user
    exports.registerUser = async (req, res) => {
        const { fullName, email, password, profileImageUrl } = req.body;

        //validation : check for missing fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const user = await User.create({
                fullName,
                email,
                password,
                profileImageUrl
            });

            res.status(201).json({
                id: user._id,
                user,
                token: generateToken(user._id), // Generate JWT token
            });
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error registering User', error: err.message });
    }
};


    // Login user
    exports.loginUser = async (req, res) => {
        const { email, password } = req.body;

        // Validation: check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        try {
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }


            res.status(200).json({
                id: user._id,
                user,
                token: generateToken(user._id), // Generate JWT token
            });

        } catch (err) {
        res
            .status(500)
            .json({ message: 'Error registering User', error: err.message });
    }
    };

    // User info
    exports.getUserInfo = async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res
            .status(500)
            .json({ message: 'Error registering User', error: err.message });  
        };
    };
