const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')

const registerValidation = require('../validation/register')

const router = express.Router()

// REGISTER
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


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({where: {email}})
    const passwordCheck = await bcrypt.compare(password, user.password)
    
    if (!passwordCheck) {
      return json.status(401).json('Wrong password')
    }

    const secretOrPrivateKey = 'bla'

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      personalId: user.personalId,
    }

    const token = await jwt.sign(payload, secretOrPrivateKey, {expiresIn: '1 days'})

    res.json(`Bearer ${token}`)

  } catch(e) {
    console.log(e.message)
  }
})

// protected route test
router.get('/test', auth, (req, res, next) => {
  
  res.json('yo')
})


module.exports = router