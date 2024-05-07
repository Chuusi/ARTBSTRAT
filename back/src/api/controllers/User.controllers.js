const { getTestSendMail, setTestSendMail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const {sendEmail} = require("../../utils/sendEmail");
const User = require("../models/User.model");
const {deleteImgCloudinary} = require("../../middleware/files.middleware")


//? --------------------------------- REGISTRO USER ---------------------------------------
const registerUser = async (req, res, next) => {
    
    let catchImg = req.file?.path;

    try {

        await User.syncIndexes();

        let confirmationCode = randomCode();
        
        const { email, name } = req.body;

        const userExist = await User.findOne(
            {email: req.body.email},
            {name: req.body.name},
        );

        if(!userExist){
            
            const newUser = new User({...req.body, checkCode: confirmationCode});

            //Comprueba si hay imagen en el body para poner una por defecto si no la hay
            if(req.file){
                newUser.image = req.file.path;
            } else {
                newUser.image =
                    "https://res.cloudinary.com/da7unrk9q/image/upload/v1715110667/logo_y2nzfr.png";
            };

            try {
                const userSave = await newUser.save();
                
                //Hacemos el control del nodemailer
                if(userSave) {

                    sendEmail(email, name, confirmationCode);

                    setTimeout(() => {
                        if (getTestSendMail()) {
                            setTestSendMail(false);
                            return res.status(200).json({
                                user: userSave.email,
                                confirmationCode: "Código de confirmación enviado al mail",
                            })
                        } else {
                            setTestSendMail(false);
                            return res.status(404).json({
                                message:"❌ Error en el envío del código de confirmación ❌",
                                error: "ERROR 404 en el if/else del registro, parte del envío del mail."
                            });
                        }
                    }, 1500);

                }

            } catch (error) {
                return res.status(404).json({
                    message: "❌ Error al guardar el usuario en la DB ❌",
                    error: error,
                });
            }

        } else {
            if(req.file) deleteImgCloudinary(catchImg);
            return res.status(409).json({
                message: "❌ Ya existe una cuenta con ese email ❌",
                error: "ERROR 409 en el if/else del register en userExist"
            });
        }

    } catch (error) {

        if(req.file) deleteImgCloudinary(catchImg);

        return res.status(500).json({
            message: "❌ Error en el try/catch general del register ❌",
            error: error,
        });
    };
};

//? ------------------------------ REENVIAR CÓDIGO USER------------------------------------
const resendCheckCode = async(req, res, next) => {
    let newCheckCode = randomCode();
    try {
        
        const {email, name} = req.body;
        const userExist = await User.findOne({email:email});

        if(userExist){

            sendEmail(email, name, newCheckCode);

            setTimeout(async () => {
                if (getTestSendMail()) {
                    setTestSendMail(false);

                    try {
                        await userExist.updateOne({
                            checkCode: newCheckCode,
                        });
                        return res.status(200).json({
                            user: userExist.email,
                            newCheckCode: "Nuevo checkCode enviado",
                            resend: true,
                        });
                    } catch (error) {
                        res.status(404).json({
                            message:
                                "❌ No se actualizó el nuevo checkCode en la DB ❌",
                            error: error,
                            resend: false,
                        });
                    }
                } else {
                    setTestSendMail(false);
                    return res.status(404).json({
                        message:
                            "❌ No se pudo enviar el email con el nuevo código ❌",
                        error: error,
                        resend: false,
                    });
                }
            }, 2500);
        } else{
            return res.status(404).json({
                message: "❌ No existe un usuario en la DB con ese email ❌",
                error: "ERROR 404 en el resendCheckCode parte if/else de userExist"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del resendCheckCode ❌",
            error: error,
        });
    }
}


module.exports = {
    registerUser,
    resendCheckCode,
}