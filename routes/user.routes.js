const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { userValidationRules } = require('../models/user.models');
const authenticateToken = require('../middleware/validator')

router.get('/register', (req, res) => {
    res.render('index');
});

router.post('/register' ,userValidationRules, userController.registerUser);

module.exports = router;
