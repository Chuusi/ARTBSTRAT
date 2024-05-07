const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestSendMail } = require("../state/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {
    
    setTestSendMail(false);

    const emailEnv = process.env.EMAIL;
    const passwordENV = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailEnv,
            pass: passwordENV,
        },
    });

    const mailOptions = {
        from: emailEnv,
        to: userEmail,
        subject: `${name}`,
        text:`${confirmationCode}`,
    };

    transporter.sendMail(mailOptions, function(error,info) {
        if(error){
            console.log(error);
            setTestSendMail(false);
            return;
        }
        console.log("Mail enviado: " + info.response);
        setTestSendMail(true);
    });
};

module.exports = {sendEmail};