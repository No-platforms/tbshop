const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  telegramId: {
    type: DataTypes.STRING,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'fa'
  },
  inviteCode: {
    type: DataTypes.STRING,
    unique: true
  },
  invitedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: true
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;