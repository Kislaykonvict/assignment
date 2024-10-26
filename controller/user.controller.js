const userModel = require('../models/user.models');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, tc } = req.body;

    try {
        await userModel.saveUser(req.db, {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            tc: tc === 'on'
        });

        res.send('User registered successfully');
    } catch (err) {
        console.error('Error while saving user:', err);
        res.status(500).send('Server Error');
    }
};
