const { body, validationResult } = require('express-validator');

function validateRegisterUser() {
    return [
        body('email').isEmail().not().isEmpty(),
        body('phone').isLength({ min: 10 }).not().isEmpty(),
        body('password').isLength({ min: 6 }).not().isEmpty(),
        body('firstName').trim().not().isEmpty(),
        body('lastName').trim().not().isEmpty(),
        body('gender').isNumeric().not().isEmpty(),
        body('dob').isISO8601().toDate()]
}
module.exports = validateRegisterUser