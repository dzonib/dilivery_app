const express = require('express')

const sequelize = require('./db/sequelize')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const adminRoutes = require('./routes/admin-product')

const User = require('./models/user')
const Cart = require('./models/cart')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/admin', adminRoutes)

User.hasOne(Cart)
User.hasMany(Product)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})

const port = process.env.PORT || 5000

sequelize
  .sync()
  .then(() => app.listen(port, () => console.log(`App running on http://localhost:5000`)))
