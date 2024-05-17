import nodemailer from nodemailer;
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.GMAIL_APP_USER,

        pass: process.env.GMIL_APP_PASSWORD,//sender email password
    },
});
const mailOptions = ({
    from: {
        name: "Sharelearner",
        addresss: process.env.GMAIL_APP_USER,
    }, // sender address
    to: [], // list of receivers
    subject: "Sending email using nodemailer and node js", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>",
    attachments: [{

    }] // html body
});
const sendEmail = async (transporter, mailOptions) => {
    try {
        await transporter.sendEmail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}
sendEmail(transporter, mailOptions);