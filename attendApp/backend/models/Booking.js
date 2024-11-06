const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('attend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Booking extends Model {}
Booking.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'bookings',
  timestamps: false
});

module.exports = Booking;