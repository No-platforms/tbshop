const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    defaultValue: 'pending'
  },
  paymentGateway: {
    type: DataTypes.STRING
  },
  paymentToken: {
    type: DataTypes.STRING
  },
  referenceId: {
    type: DataTypes.STRING
  }
});

module.exports = Invoice;