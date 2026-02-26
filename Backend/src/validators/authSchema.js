import { body } from 'express-validator';

const loginSchema = [
    body('username')
        .notEmpty()
        .withMessage('UserName cannot be empty.')
        .bail()
        .isString()
        .withMessage('UserName must be a string.')
        .bail()
        .isLength({ max: 100 })
        .withMessage('UserName cannot exceed 100 characters.'),

    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty.')
        .bail()
        .isString()
        .withMessage('Password must be a string.')
        .bail()
        .isLength({ min: 8, max: 50 })
        .withMessage('Password must be between 8 and 50 characters.')
];

const registerSchema = [
    body('username')
        .notEmpty()
        .withMessage('UserName cannot be empty.')
        .bail()
        .isString()
        .withMessage('UserName must be a string.')
        .bail()
        .isLength({ max: 100 })
        .withMessage('UserName cannot exceed 100 characters.'),

    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty.')
        .bail()
        .isEmail()
        .withMessage('Invalid email.')
        .bail()
        .isString()
        .withMessage('Email must be a string.')
        .bail()
        .isLength({ max: 100 })
        .withMessage('Email cannot exceed 100 characters.'),

    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty.')
        .bail()
        .isString()
        .withMessage('Password must be a string.')
        .bail()
        .isLength({ min: 8, max: 50 })
        .withMessage('Password must be between 8 and 50 characters.')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage(
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        )
];

export default {
    loginSchema,
    registerSchema,
};