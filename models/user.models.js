const { check, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

exports.userValidationRules = [
    check('name')
        .isLength({ min: 3, max: 30 })
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Name should be between 3 and 30 characters and only alphabets are allowed.'),
    check('email').isEmail().withMessage('Must be a valid email address.'),

    check('phone')
        .isNumeric()
        .withMessage('Phone number must only contain numbers.')
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be exactly 10 digits long.'),

    check('tc').equals('on').withMessage('You must accept the terms and conditions.')
];

const sanitizeInput = (input) => {
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {}
    });
};

exports.saveUser = async (db, userData) => {
    const usersCollection = db.collection('Users');

    userData.name = sanitizeInput(userData.name);
    userData.email = sanitizeInput(userData.email);
    userData.phone = sanitizeInput(userData.phone);

    const result = await usersCollection.insertOne(userData);
    return result;
};