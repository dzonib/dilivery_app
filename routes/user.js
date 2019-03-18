const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/user')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const registerValidation = require('../validation/register')

const router = express.Router()

// REGISTER
router.post('/register', async(req, res) => {
  try {

    const {isValid, errors} = registerValidation(req.body)

    if (!isValid) {
      res.json(errors)
    }

    const {name, email, address, personalId, password} = req.body

    const checkEmail = await User.findOne({where: {
        email
      }})

    if (checkEmail) {
      errors.email = "Email already taken!"
      return res
        .status(400)
        .json(errors)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({name, email, address, personalId, password: hashedPassword})

    await user.createCart()

    res.json(user)
  } catch (e) {
    console.log(e.message)
  }
})


// LOGIN
router.post('/login', async(req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({where: {
        email
      }})
    const passwordCheck = await bcrypt.compare(password, user.password)

    if (!passwordCheck) {
      return json
        .status(401)
        .json('Wrong password')
    }

    const secretOrPrivateKey = 'bla'

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      personalId: user.personalId
    }

    const token = await jwt.sign(payload, secretOrPrivateKey, {expiresIn: '1 days'})

    res.json(`Bearer ${token}`)

  } catch (e) {
    console.log(e.message)
  }
})

// Multer
const multer = require('multer')

const upload = multer({
  // dest: 'routes/images',
  limits: {
    fileSize: 1048576
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload the image with one of following formats - jpg, jpeg or pgn'))
    }

    cb(undefined, true)
  }
})

// CREATE/UPDATE PHOTO ROUTE
router.post('/avatar/upload', auth, upload.single('upload'), async(req, res, next) => {

  try {
    // we can access this only when we dont have defined "dest" property in multer
    const user = await User.findOne({
      where: {
        email: req.user.email
      }
    })

    user.avatar = req.file.buffer
    await user.save()

    res.sendStatus(200)
  } catch (e) {
    console.log(e.message)
  }
  // second callback function needs to have this set of arguments for error
  // handling
}, (error, req, res, next) => {
  res
    .status(400)
    .send({error: error.message})
})

// DELETE PHOTO ROUTE
router.delete('/avatar/delete', auth, async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email
      }
    })

    await user.update({avatar: null})
    await user.save()
    res.sendStatus(200)
  } catch (e) {
    console.log(e.message)
  }
})

// http://localhost:5000/api/user/1/avatar it showes picture in browser
router.get('/:id/avatar', async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user || !user.avatar) {
      throw new Error('No user or user avatar')
    }

    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res
      .status(404)
      .json({error: e.message})
  }
})


module.exports = router
