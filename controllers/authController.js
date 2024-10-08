const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function
exports.signup = async (req, res) => {
    const { name, email, password, role = 'user'} = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({sucess : false, message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User
        user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            role : role
        });

        // save the new user
        const savedUser = await user.save();
        return res.status(200).json({
            success : true,
            message: 'User registered successfully' 
        });

    } catch (error) {
        return res.status(500).json({sucess : false, message: 'Internal server error' });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
