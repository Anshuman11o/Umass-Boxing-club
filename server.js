const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json()); // For parsing application/json

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint for contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Email content
  const mailOptions = {
    from: email, // The email of the user who filled the form
    to: process.env.EMAIL_USER, // Your email address (from .env)
    subject: `Contact Us Form Submission from ${name}`,
    text: `
      You have a new message from the UMass Boxing website:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Message: ${message}
    `,
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Email failed to send' });
    }
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add this to your existing server code
app.post('/api/newsletter', (req, res) => {
  const { name, email } = req.body;

  // Email content
  const mailOptions = {
    from: email, // The email of the subscriber
    to: process.env.EMAIL_USER, // Your email address (from .env)
    subject: `Newsletter Member Request from ${name} (${email})`,
    text: `
      You have a new newsletter subscription request:

      Name: ${name}
      Email: ${email}
    `,
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Email failed to send' });
    }
    res.status(200).json({ success: true, message: 'Subscription successful, email sent!' });
  });
});