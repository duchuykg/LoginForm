const nodemailer = require('nodemailer');

const LINK_SERVER = "http://localhost:4000"

async function sendEmail(email, confirmationToken) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS
        }
    });
    const confirmationLink = `${LINK_SERVER}/confirm?token=${confirmationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Verify Email',
        html: `
        <p>Hello,</p>
        <p>Thank you for registering with our service. To complete your account registration, please click the link below to verify your email:</p>
        <p><a href="${confirmationLink}">${confirmationLink}</a></p>
        <p>If you did not request this registration, you can safely ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Service Team</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendEmail;