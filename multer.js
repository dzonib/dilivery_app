
const upload = multer({
  // if we remove dest property multer passess the image to next function
  // it does not save it to file
  // use it when saving to db
  // dest: 'images',
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


//___________________________ USER ROUTE _______________________________


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