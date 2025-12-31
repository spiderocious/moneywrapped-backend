import { body } from 'express-validator';

export const signupValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores')
    .customSanitizer((value) => value.toLowerCase()),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
];

export const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .customSanitizer((value) => value.toLowerCase()),

  body('password').notEmpty().withMessage('Password is required'),
];

export const updateProfileValidation = [
  body('email').optional().trim().isEmail().withMessage('Invalid email format').normalizeEmail(),

  body('avatar').optional().trim().isURL().withMessage('Avatar must be a valid URL'),
];
