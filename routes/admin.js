const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/test', auth, (req , res, next) => {
  res.json(req.user)
})


module.exports = router