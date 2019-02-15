const express = require('express')

const auth = require('../middleware/auth')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

const router = express.Router()


// add product in cart
router.post('/add-product/:id', auth , async (req, res, next) => {

  try {
    const user = await User.findOne({where: {id: req.user.id}})
    const cart = await user.getCart()

    const product = await Product.findByPk(req.params.id)


    const productInCart = await cart.addProduct(product, {through: {quantity: 1}})

    console.log(JSON.stringify(productInCart, undefined, 4))

    res.json(productInCart)
  } catch(e) {
    console.log(e.message)
  }
})

// get items in cart
router.get('/get-cart-products', auth, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: { userId: req.user.id}})

    const crap = await cart.getProducts()
    
    console.log(JSON.stringify(crap, undefined, 4))

    res.json(crap)
  } catch(e) {
    console.log(e.message)
  }
})

module.exports = router