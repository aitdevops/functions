const nodemailer = require('nodemailer');
const { Client } = require('pg');

exports.sendApprovalEmail = async (req, res) => {
    const userId = req.body.id;
    const username = req.body.username;
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajeevkoppisetti21@gmail.com',
            pass: 'Rajeev@9119',  // Use an app password for Gmail
        },
    });

    const approvalLink = `https://aitdevops.com/approval/${userId}`;

    const mailOptions = {
        from: 'rajeevkoppisetti21@gmail.com',
        to: 'rajeev.k3555@gmail.com',
        subject: 'New User Approval Needed',
        text: `A new user has signed up:\n\nUsername: ${username}\nEmail: ${email}\n\nApprove the user: ${approvalLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Approval email sent.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send approval email.');
    }
};
