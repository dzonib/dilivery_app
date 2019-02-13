const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (reqData) => {
  try {
    const errors = {}

    const {email, password} = reqData

    if (Validator.isEmpty(email)) {
      errors.email = "Please enter your email"
    }

    if (Validator.isEmpty(password)) {
      errors.password = "Please enter your password"
    }
  
    return {
      isValid: isEmpty(errors),
      errors
    }
  } catch(e) {
    console.log(e.message)
  }
}