const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.get('Authorization')) {
    const token = req.get('Authorization').split(' ')[1]

    if (token) {
      req.user = jwt.decode(token)
      next()
    } else {
      throw new Error('Not Authorized!')
    }
  } else {
    throw new Error('Not Authorized!')
  }
}