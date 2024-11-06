const express = require('express');
const venueController = require('../controllers/venueController');

const router = express.Router();

// GET /api/venues - Retrieve all venues
router.get('/venues', venueController.getAllVenues);

// GET /api/venues/search - Search venues with query parameters
router.get('/venues/search', venueController.searchVenues);

// GET /api/venues/:id - Retrieve a venue by ID
router.get('/venues/:id', venueController.getVenueById);

// POST /api/venues - Create a new venue
router.post('/venues', venueController.createVenue);

// PUT /api/venues/:id - Update a venue by ID
router.put('/venues/:id', venueController.updateVenue);

// DELETE /api/venues/:id - Delete a venue by ID
router.delete('/venues/:id', venueController.deleteVenue);

module.exports = router;

**Model File Update:**

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venue = sequelize.define('Venue', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    availableDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'venues',
    timestamps: false,
});

module.exports = Venue;

**Database Configuration Update:**

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'db',
    dialect: 'mysql',
});

module.exports = sequelize;

**Ensure Integration:**

- Ensure that the model file `Venue` is used in the `venueController` and is properly integrated with the CRUD operations in the controller functions.
- The database configuration should be correctly referenced in the application setup.