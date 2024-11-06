const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

class Venue extends Model {}

Venue.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  availableDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Venue',
  tableName: 'venues',
  timestamps: false
});

module.exports = Venue;

const Venue = require('../models/Venue');

// Get all venues
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve venues' });
  }
};

// Search venues based on query parameters
exports.searchVenues = async (req, res) => {
  const { location, capacity, date } = req.query;
  const query = {};

  if (location) {
    query.location = { [Sequelize.Op.like]: `%${location}%` };
  }
  if (capacity) {
    query.capacity = { [Sequelize.Op.gte]: parseInt(capacity) };
  }
  if (date) {
    query.availableDate = { [Sequelize.Op.gte]: new Date(date) };
  }

  try {
    const venues = await Venue.findAll({ where: query });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search venues' });
  }
};

// Get a venue by ID
exports.getVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      res.json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve venue' });
  }
};

// Create a new venue
exports.createVenue = async (req, res) => {
  const { name, location, capacity, availableDate } = req.body;
  try {
    const newVenue = await Venue.create({ name, location, capacity, availableDate });
    res.status(201).json(newVenue);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create venue' });
  }
};

// Update a venue by ID
exports.updateVenue = async (req, res) => {
  const { id } = req.params;
  const { name, location, capacity, availableDate } = req.body;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      venue.name = name;
      venue.location = location;
      venue.capacity = capacity;
      venue.availableDate = availableDate;
      await venue.save();
      res.json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update venue' });
  }
};

// Delete a venue by ID
exports.deleteVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      await venue.destroy();
      res.json({ message: 'Venue deleted successfully' });
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete venue' });
  }
};