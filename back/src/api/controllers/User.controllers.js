const { getTestSendMail, setTestSendMail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const {sendEmail} = require("../../utils/sendEmail");
const User = require("../models/User.model");
const {deleteImgCloudinary} = require("../../middleware/files.middleware")
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../../utils/token");
const validator = require("validator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


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

//? -------------------------------- CHECK CODE USER---------------------------------------
const checkUser = async(req,res,next) => {
    
    try {
        
        const {checkCode, email} = req.body;
        const userExist = await User.findOne({email:email});

        if(!userExist){

            return res.status(404).json({
                message:"❌ No existe el usuario a checkear ❌",
                error: "ERROR 404 en el if/else del checkUser en userExist"
            })

        } else {

            let trys = userExist.checkCodeTrys;
            
            
            if (checkCode === userExist.checkCode) {
                try {
                    await userExist.updateOne({ check: true });
                    const updateUser = await User.findOne({ email });
                    return res.status(200).json({
                        message:
                            "Se ha actualizado correctamente el check en el user",
                        testCheckOk:
                            updateUser.check == true ? true : false,
                    });
                } catch (error) {
                    //catch del update al confirmar el código
                    return res.status(404).json({
                        message:
                            "❌ No se pudo actualizar el check en el usuario ❌",
                        error: error,
                    });
                }
            } else {
                trys++;
                if(trys < 3){
                    try {
                        await userExist.updateOne({ checkCodeTrys: trys });
                        const updateTrys = await User.findOne({ email });

                        return res.status(200).json({
                            message: `Intento número ${trys}, al fallar 3, se borrará el usuario.`,
                            testUpdateTrys:
                                trys == updateTrys.checkCodeTrys
                                    ? `Se actualizó el número de trys, van ${updateTrys.checkCodeTrys}`
                                    : "No se actualizó correctamente el número de trys",
                        });
                    } catch (error) {
                        //No se sumó el número de trys
                        return res.status(404).json({
                            message:
                                "❌ No se pudo actualizar la información en la DB❌ ",
                            error: error,
                        });
                    }
                } else{
                    try {
                        await User.findByIdAndDelete(userExist._id);
                        deleteImgCloudinary(userExist.image);

                        return res.status(200).json({
                            message:
                                "Intento número 3 fallido, eliminando usuario de la DB",
                            delete: (await User.findById(userExist._id))
                                ? "No se borró correctamente de la DB"
                                : "Usuario borrado de la DB con éxito",
                        });
                    } catch (error) {
                        return res.status(404).json({
                            message:
                                "❌ No se pudo borrar al usuario de la DB tras fallar 3 veces el check code ❌",
                            error: error,
                        });
                    }
                }
                
            }
        }


    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del checkUser ❌",
            error: error,
        });
    }
}

//? -------------------------------------- LOGIN ------------------------------------------
const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});

        if (userExist) {
            if (bcrypt.compareSync(password, userExist.password)) {
                
                const token = generateToken(userExist._id, email);
                return res.status(200).json({
                    message:"Token generado, login satisfactorio",
                    user: userExist,
                    token,
                });
            } else {
                return res.status(404).json({
                    message: "❌ Contraseña incorrecta ❌",
                    error: "ERROR 404 en el if/else del login comparando contraseñas",
                });
            }
        } else {
            //!userExist
            return res.status(404).json({
                message: "❌ No existe un usuario con ese email ❌",
                error: "ERROR 404 en el if/else del login en userExist",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del login ❌",
            error: error,
        });
    }
}

//? --------------------------- CHANGE PASSWORD (LOGUEADO)---------------------------------
const changePassword = async (req,res,next) => {
    try {

        const {password, newPassword} = req.body;
        const {_id } = req.user;

        if(validator.isStrongPassword(newPassword)){
            console.log("Contraseña segura");
            if (bcrypt.compareSync(password, req.user.password)) {
                const newPasswordBcrypt = bcrypt.hashSync(newPassword, 10);

                try {
                    await User.findByIdAndUpdate(_id, {
                        password: newPasswordBcrypt,
                    });

                    //testing
                    const userUpdate = await User.findById(_id);
                    if (bcrypt.compareSync(newPassword, userUpdate.password)) {
                        return res.status(200).json({
                            message: "Contraseña actualizada con exito",
                            updateUser: true,
                        });
                    } else {
                        return res.status(404).json({
                            message: "❌ La contraseña no se actualizó ❌",
                            error: "ERROR 404 en el if/else del changePassword actualizando la DB",
                        });
                    }
                } catch (error) {
                    //update pass
                    return res.status(404).json({
                        message: "❌ Error en la búsqueda de user en la DB ❌",
                        error: error,
                    });
                }
            } else {
                return res.status(404).json({
                    message: "❌ La antigua contraseña no es correcta ❌",
                    error: "ERROR 404 en el if/else del changePassword comparando la antigua contraseña",
                });
            }
        } else {
            console.log("Cotnraseña no segura");
            return res.status(404).json({
                message: "❌ La nueva contraseña no es segura ❌",
                error: "ERROR 404 en el if/else del changePassword contraseña no segura",
            });
        }
        

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del changePassword ❌",
            error: error,
        });
    }
}


//? ----------------------- FORGOTTEN PASSWORD (NO LOGUEADO)-------------------------------
//* ---> Control del envío de email para contraseña olvidada, no para el cambio de password
const forgottenPassword = async(req,res,next) => {
    try {
        const {email} = req.body;
        const userExist = await User.findOne({email});
        
        if(userExist) {
            const emailEnv = process.env.EMAIL;
            const passwordEnv = process.env.PASSWORD;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailEnv,
                    pass: passwordEnv,
                },
            });
            const token = generateToken(userExist, userExist.email);
            const mailOptions = {
                from: emailEnv,
                to: userExist.email,
                subject: "Cambio pass",
                text: `http://localhost:8080/artbstrat/user/changeForgottenPassword/${token}`,
            };
            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    return res.status(404).json({
                        message:
                            "❌ No se pudo mandar el email para el cambio de código de acceso ❌",
                        error: error,
                    });
                } else {
                    console.log("Email enviado: " + info.response);
                    return res
                        .status(200)
                        .json("El mail se envió correctamente.");
                }
            });
        } else {
            return res.status(404).json({
                message: "❌ No existe un usuario con ese email ❌",
                error: "ERROR 404 en el if/else del forgottenPassword en userExist",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del forgottenPassword ❌",
            error: error,
        });
    }
}

//? --------------------- CHANGE FORGOTTEN PASSWORD FROM EMAIL ----------------------------
const changeForgottenPassword = async(req,res,next) => {
    try {

        const {token} = req.params;
        const decoded = verifyToken(token);

        const {newPassword, newPasswordCheck} = req.body;
        const newPasswordBcrypt = bcrypt.hashSync(newPassword, 10);

        if(validator.isStrongPassword(newPassword)){

            if (newPassword === newPasswordCheck) {
                try {
                    await User.findByIdAndUpdate(decoded.id, {
                        password: newPasswordBcrypt,
                    });

                    const userUpdate = await User.findById(decoded.id);

                    if (bcrypt.compareSync(newPassword, userUpdate.password)) {
                        return res
                            .status(200)
                            .json("La contraseña se cambió correctamente");
                    } else {
                        return res.status(404).json({
                            message:
                                "❌ La contraseña no se cambió con éxito ❌",
                            error: "ERROR 404 en el if/else del changeForgottenPassword en la comparación con el update",
                        });
                    }
                } catch (error) {
                    //no update
                    return res.status(404).json({
                        message:
                            "❌ Error en el cambio de contraseñas en la DB ❌",
                        error: error,
                    });
                }
            } else {
                return res.status(404).json({
                    message: "❌ Las nuevas contraseñas no coinciden ❌",
                    error: "ERROR 404 en el if/else del changeForgottenPassword en la comparación de contraseñas nuevas",
                });
            }

        } else {
            console.log("Cotnraseña no segura");
            return res.status(404).json({
                message: "❌ La nueva contraseña no es segura ❌",
                error: "ERROR 404 en el if/else del changePassword contraseña no segura",
            });
        }

        
    } catch (error) {
        return res.status(500).json({
            message:
                "❌ Error en el try/catch general del changeForgottenPassword ❌",
            error: error,
        });
    }
}


module.exports = {
    registerUser,
    resendCheckCode,
    checkUser,
    login,
    changePassword,
    forgottenPassword,
    changeForgottenPassword,
}