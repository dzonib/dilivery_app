const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')


const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


module.exports = Product