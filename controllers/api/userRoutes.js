const router = require('express').Router();
const { User } = require('../../models');

// sign up new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // after registration user is authenticated and logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        let message = 'Unable to sign up. Please verify your information and try again.';
        if (err.name === 'SequelizeUniqueConstraintError') {
          message = 'An account with this email already exists.';
        } else if (err.name === 'SequelizeValidationError') {
          const validationError = err.errors?.[0];
          if (validationError?.path === 'email' && validationError?.validatorKey === 'isEmail') {
            message = 'Please enter a valid email address.';
          } else if (validationError?.path === 'password' && validationError?.validatorKey === 'len') {
            message = 'Password must be at least 8 characters long.';
          } else if (validationError?.message) {
            message = validationError.message;
          }
        }
        res.status(400).json({ message });
      }
});

// log in user
router.post('/login', async (req, res) => {
    try {
        // locate user via email
        const userData = await User.findOne({ where: { email: req.body.email } });
        // verify user credentials
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again.' });
            return;
        };
        // verify password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }
        // after credentials verified, user is authenticated and logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// log out user
router.post('/logout', (req, res) => {
    // verify user is logged in first
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;