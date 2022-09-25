const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// backend/routes/api/users.js
// ...


// ...
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 character long.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 character long.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const usernameExists = await User.findOne({
        where: { username }
      });
      
      const emailExists = await User.findOne({
        where: { email }
      });

      if (usernameExists) {
        res
            .status(403)
            .json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": [
                    "User with that username already exists"
                ]
            })
      };

      if (emailExists) {
        res
            .status(403)
            .json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": [
                    "User with that email already exists"
                ]
            })
      };

      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);

      const userObj = user.toJSON();
      userObj.token = token;

      return res.json(userObj);
    }
  );


module.exports = router;
