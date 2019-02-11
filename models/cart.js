const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')


const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Cart