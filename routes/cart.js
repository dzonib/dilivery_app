const express = require('express')

const auth = require('../middleware/auth')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

const router = express.Router()


router.post('/add', auth , async (req, res, next) => {

  try {
    const user = await User.findOne({where: {id: req.user.id}})
    const cart = await user.getCart()

    const product = Product.findByPk(req.body.id)

    product.inCart = true

    cart.addProduct(product, {through: {quantity: 1}})

    res.json(user)
  } catch(e) {
    console.log(e.message)
  }
  
})

module.exports = router