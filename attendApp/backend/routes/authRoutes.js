const express = require('express');
const { loginUser, registerUser, resetPassword } = require('../controllers/authController');
const { User } = require('../models/User'); // Ensure model matches the 'users' table
const sequelize = require('../config/database');
const router = express.Router();

// Modify database connection host to 'db'
sequelize.host = 'db';

// Ensure models include primary key and match database schema
sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

// POST /auth/login - Log in a user
router.post('/login', loginUser);

// POST /auth/register - Register a new user
router.post('/register', registerUser);

// POST /auth/reset-password - Reset user password
router.post('/reset-password', resetPassword);

module.exports = router;