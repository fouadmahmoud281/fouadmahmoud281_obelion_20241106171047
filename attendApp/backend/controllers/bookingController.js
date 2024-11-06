const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'db',
    dialect: 'mysql'
});

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'bookings',
    timestamps: false
});

module.exports = Booking;

const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    try {
        const { name, email, venue, date, time } = req.body;
        const newBooking = await Booking.create({ name, email, venue, date, time });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, venue, date, time } = req.body;
        const booking = await Booking.findByPk(id);
        if (booking) {
            await booking.update({ name, email, venue, date, time });
            res.status(200).json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (booking) {
            await booking.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};