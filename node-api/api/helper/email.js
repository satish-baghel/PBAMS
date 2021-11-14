const nodemailer = require('nodemailer')
exports.SendMail = async (to, subject, message) => {
  //   console.log("Called");

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sp769843@gmail.com',
      pass: 'satish.satish', // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    //from: '"Masutane Research Forms" <mphompofu66@gmail.com>', // sender address
    from: 'sp769843@gmail.com',
    to: to, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  })
  return info
}
