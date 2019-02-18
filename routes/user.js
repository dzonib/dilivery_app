const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/user')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const registerValidation = require('../validation/register')


const router = express.Router()

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}))

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

  await transporter.sendMail({
    to: email, 
    from: 'shopname@email.com', 
    subject: 'signup', 
    html: '<h1>You successfully signed in!</h1>'
  })

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

// Resert password
router.post('/password-reset', (req, res, next) => {

  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err.message)
      res.json({error: true})
    }

    const token = buffer.toString('hex')

    try {
      const user = await User.findOne({where: {email}})

      if (!user) {
        res.json({error: "No account with that email found"})
      }

      user.resetToken = token
      user.resetTokenExpiration = Date.now() + (1000 * 60 * 60)

      await user.save()

      await transporter.sendMail({
        to: req.body.email, 
        from: 'shopname@email.com', 
        subject: 'Password reset', 
        html: `
          <p>You requested a password reset</p>
          <p>Click this link to set a new password</p>
        `
      })
    } catch(e) {
      console.log(e.message)
      res.json({})
    }
    res.json(token)
  })


})



module.exports = router