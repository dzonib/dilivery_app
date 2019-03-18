
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