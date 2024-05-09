const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { setTestSendMail } = require("../state/state.data");

const sendEmail = (userEmail, name, context, template) => {
    
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


    const handlebarOptions = {
            viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('src/views'),
            defaultLayout: false,
            },
            viewPath: path.resolve('src/views'),
            extName: ".handlebars",
        }
    console.log(handlebarOptions);

    transporter.use("compile", hbs(handlebarOptions));


    const mailOptions = {
        from: emailEnv,
        to: userEmail,
        subject: "ARTBSTRAT - Código de confirmación",
        template: template,
        context: {
            user: name,
            code: context
        }
    };

    console.log(mailOptions);

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