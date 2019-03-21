require('dotenv').config()
const express = require('express')

const sequelize = require('./db/sequelize')

const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)

const port = process.env.PORT || 5000

sequelize
  .sync()
  .then(() => app.listen(port, () => console.log(`App running on http://localhost:5000`)))
