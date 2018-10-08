var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: 'yourpassword'
  }
});