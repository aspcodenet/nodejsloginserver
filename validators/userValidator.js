const {check, validationResult} = require('express-validator');

const validateCreateUser = [
  check('firstName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('FirstUser name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password name can not be empty!')
    .bail()
    .isLength({min: 8})
    .withMessage('Minimum 8 characters required!')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];



const validateLoginUser = [
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
  check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password name can not be empty!')
      .bail()
      .isLength({min: 8})
      .withMessage('Minimum 8 characters required!')
      .bail(),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];




module.exports = {
    validateLoginUser,
    validateCreateUser
}
