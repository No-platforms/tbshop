const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Invoices',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.ENUM('success', 'failed'),
    defaultValue: 'success'
  },
  gateway: {
    type: DataTypes.STRING
  },
  referenceId: {
    type: DataTypes.STRING
  },
  rawResponse: {
    type: DataTypes.TEXT
  }
});

module.exports = Transaction;