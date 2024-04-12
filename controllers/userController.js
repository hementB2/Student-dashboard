const User = require('../models/User');

const userController = {
    signup: (req, res) => {
        res.render('signup', { title: 'Sign Up' });
    },

    login: (req, res) => {
        res.render('login', { title: 'Login' });
    },

    logout: (req, res) => {
        // Implement user logout logic
    }
};

module.exports = userController;
