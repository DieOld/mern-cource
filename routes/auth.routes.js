const {Router} = require('express');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();
const config = require('config');


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Bad email').isEmail(),
        check('password', 'Bad password').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data'
            });
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({
                message: 'User with that email already exists'
            })
        }
        const hashedPassword = await bcript.hash(password, 12);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        res.status(201).json({
            message: 'User was created!'
        })
    } catch (e) {
        res.status(500).json({
            message: `Something went wrong... ${e.message}`
        });
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Bad email').normalizeEmail().isEmail(),
        check('password', 'Bad password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong login data.'
            });
        }
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(400).json({
                message: 'User does not exists.'
            });
        }

        const isMatch = await bcript.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Wrong password.'
            });
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );
        res.json({
            token,
            userId: user.id
        });

    } catch (e) {
        res.status(500).json({
            message: `Something went wrong... ${e.message}`
        });
    }
});

module.exports = router;
