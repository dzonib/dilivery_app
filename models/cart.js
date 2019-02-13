const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')


const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = Cart