const express = require('express')
const auth = require('../middleware/auth')

const User = require('../models/user')
const Product = require('../models/product')

const router = express.Router()

router.post('/add-product', auth, async (req, res, next) => {
  try {
    
    const user = await User.findByPk(req.user.id)

    if (user.admin === true) {

      const { name, price, description, stock, imageUrl } = req.body

      const product = await user.createProduct({
        name,
        price,
        description,
        imageUrl,
        stock
      })

      res.json(product)
    } else {
      res.status(401).json({fail: true})
    }
  } catch(e) {
    console.log(e.message)
  }
})

router.put('/update-product/:id', auth, async (req, res, next) => {
  
  try {
    const user = await User.findByPk(req.user.id)
    if (user.admin === true) {
      const { name, price, description, stock, imageUrl } = req.body

        const product = await Product.update(
        {name, imageUrl, price, description, stock},
        {returning: true, where: {id: req.params.id}}
      )

      res.json(product)
    } else {
      res.json({fail: true})
    }
  } catch(e) {
    console.log(e.message)
  }
})

router.delete('/delete-product/:id', auth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user.admin === true) {
      await Product.destroy({where: {
        id: req.params.id
      }})
    res.json({success: true})
    } else {
      res.json({ fail: true })
    }
  } catch(e) {
    console.log(e.message)
  }
})

module.exports = router