const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

User.validatePassword = async function(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  return user;
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.validatePassword(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  resetPassword
};