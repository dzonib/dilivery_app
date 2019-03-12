const express = require('express')
const multer = require('multer')

const sequelize = require('./db/sequelize')
const userRoutes = require('./routes/user')
const cartRoutes = require('./routes/cart')
const adminRoutes = require('./routes/admin-product')

const User = require('./models/user')
const Cart = require('./models/cart')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')

const app = express()

const upload = multer({
    dest: 'images',
    limits: {
      // limit to 1mb
      fileSize: 1048576
    },
    // filter files you don't want to upload
    fileFilter(req, file, cb) {
      // check if file ends with pdf (can use .doc .docx or others)
      // if (!file.originalname.endsWith('.pdf')) {
      //   ....
      // }

      // regex example
      if (!file.originalname.match(/\.(doc|docx)$/)) {
        return cb(new Error('Please upload a Word document'))
      }

      // error / expect upload
      cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/admin', adminRoutes)


User.hasOne(Cart)
User.hasMany(Product)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})


const port = process.env.PORT || 5000



sequelize.sync().then(() => app.listen(port, () => console.log(`App running on http://localhost:5000`)))

