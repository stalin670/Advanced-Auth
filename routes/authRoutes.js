const express = require('express');
const { signup, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/dashboard', auth, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

router.get('/admin', auth('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
