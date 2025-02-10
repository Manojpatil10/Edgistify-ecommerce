const nodemailer = require('nodemailer');

exports.forgotPass = (req, res) => {
  const { email } = req.body;
  console.log(email);
  const Email = process.env.EMAIL_USER;
  const passkey = process.env.EMAIL_PASS

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Email,
      pass: passkey,
    },
  });

  const mailOptions = {
    from: Email,
    to: email,
    subject: 'Reset Password Link',
    html: `
      <p>Hi,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href="http://localhost:3000/updatePass/${email}" style="color: blue;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: `Reset link sent to ${email}` });
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
    });
};