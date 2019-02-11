const express = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Cart = require('../models/cart')

const registerValidation = require('../validation/register')

const router = express.Router()


router.post('/register', async (req, res) => {
  try {

    const {isValid, errors} = registerValidation(req.body)


    if (!isValid) {
      res.json(errors)
    }

    const { name, email, address, personalId, password } = req.body

    const checkEmail = await User.findOne({where: {email}})
    console.log(JSON.stringify(checkEmail, undefined, 4))

    if (checkEmail) {
      errors.email = "Email already taken!"
      res.status(400).json(errors)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      address,
      personalId,
      password: hashedPassword
    })

  await user.createCart()

  res.json(user)

  } catch(e) {
    console.log(e.message)
  }
})


module.exports = router