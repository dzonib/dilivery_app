const Validator = require('validator')
const isEmpty = require('./is-empty.js')


module.exports = ({name, email, address, personalId, password, password2}) => {
  const errors = {}

  name = isEmpty(name) ? '' : name
  email = isEmpty(email) ? '' : email
  address = isEmpty(address) ? '' : address
  personalId = isEmpty(personalId) ? '' : personalId
  password = isEmpty(personalId) ? '' : password
  password2 = isEmpty(password2) ? '' : password2

 
  if (!Validator.isLength(name, {min: 2})) {
    errors.name = "Name must be at lest 2 characters long"
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is requiered'
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Invalid email"
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is requiered'
  }

  if (!Validator.isLength(address, {min: 2})) {
    errors.address = "Invalid address"
  }

  if (Validator.isEmpty(address)) {
    errors.address = "Address field is requiered"
  }

  if (!Validator.isLength(password, {min: 6})) {
    errors.password = "Password must be at least 6 characters long"
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password is requiered"
  }

  if (!Validator.equals(password, password2)) {
    errors.password = "Passwords do not match!"
    errors.password2 = "Passwords do not match!"
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = "Password2 field is requiered"
  }


  return {
    isValid: isEmpty(errors),
    errors
  }
}