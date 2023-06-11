const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('brcypt');

const saltRounds = 5;
const hashPassword = async (password) => {
  password = await bcrypt.hash(password, saltRounds);
  return password;
};

class User extends Model {
  async authPassword(plainPassword) {
    const auth = bcrypt.compare(plainPassword, this.password);
    return auth;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = hashPassword(userData);
        userData.email = userData.email.toLowerCase();
      },
      beforeUpdate: async (userData) => {
        userData.password = hashPassword(userData);
        userData.email = userData.email.toLowerCase();
      },
    },
  }
);

module.exports = User;
