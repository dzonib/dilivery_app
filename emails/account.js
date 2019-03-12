const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)


async function sendMail() {
  await sgMail.send({
    to: 'nikolabosnjak381@gmail.com',
    from: 'nikolabosnjak@yahoo.co.uk',
    subject: 'Hey',
    text: 'whatup'
  })

  console.log('Mail Sent(I hope)')
}

sendMail()