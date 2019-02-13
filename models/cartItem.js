const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')


const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})


module.exports = CartItem