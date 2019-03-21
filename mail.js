const nodemailer = require('nodemailer')

const {MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD} = process.env


const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD
  }
})

const basicTemplate = text => `

  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello</h2>
    <p>${text}</p>

    <p>Enjoy your shoping</p>
  </div>
`

// https://mjml.io/ templating

exports.transport = transport
exports.emailTemplate = basicTemplate