const express = require('express')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')

const {emailTemplate, transport} = require('../mail')
const User = require('../db/models/User')

const router = express.Router()


// REGISTER
router.post('/register', [
  check('name').exists(),
  check('email', 'Unesite validan email')
    .trim()
    .isEmail(),
  check('password', 'Šifra mora sadržavati minimalno 6 slova ili brojeva')
    .trim()
    .isLength({min: 6})
    .custom((value, {req, loc, path}) => {
      if (value !== req.body.password2) {
        throw new Error('Šifre se ne slažu')
      } else {
        return value
      }
    })
], async (req, res) => {

  const { name, address, email, password } = req.body

  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(403).json({errors: errors.mapped()})
    }

    const user = await User.findOne({where: {email}})

    if (user) {
      return Promise.reject('Korisnik sa navedenim emailom već registrovan')
        .catch(e => res.json(e))
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      address,
      email,
      password: hashedPassword
    })

    // EMAILS (WITH MAILTRAP - nice service for dev)
    // Postmark or sendgrid or something else for production

    const mailRes = await transport.sendMail({
      from: "nikolabosnjak381@gmail.com",
      to: newUser.email,
      sumbject: 'Uspješno ste se registrovali.',
      // html: emailTemplate("Registrovani ste!!!")
      html: '<h1>You registered</h1>'

    })

    res.json(newUser)
  } catch(e) {
    console.log(e.message)
  }

})

module.exports = router