const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./db/sequelize')
const userRoutes = require('./routes/user')

const User = require('./models/user')
const Cart = require('./models/cart')

const app = express()
app.use(bodyParser.json())


app.use('/api/user', userRoutes)


User.hasOne(Cart)

const port = process.env.PORT || 5000



sequelize.sync().then(() => app.listen(port, () => console.log(`App running on http://localhost:5000`)))

