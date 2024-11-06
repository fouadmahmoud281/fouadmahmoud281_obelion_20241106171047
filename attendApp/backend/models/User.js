const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('attend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [4, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        },
        validate: {
          notEmpty: true,
          len: [8, 100]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false
    });
  }

  static async validatePassword(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}

module.exports = User;