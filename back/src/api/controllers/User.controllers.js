const { getTestSendMail, setTestSendMail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const {sendEmail} = require("../../utils/sendEmail");
const User = require("../models/User.model");
const Product = require("../models/Product.model")
const Post = require("../models/Post.model")
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
        const template = "code"; // --> para enviar el mail con el template "code"

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

                    sendEmail(email, name, confirmationCode, template);

                    setTimeout(() => {
                        if (getTestSendMail()) {
                            setTestSendMail(false);
                            return res.status(200).json({
                                user: userSave,
                                checkCode: confirmationCode,
                            })
                        } else {
                            setTestSendMail(false);
                            return res.status(404).json({
                                message:"❌ Error en el envío del código de confirmación ❌",
                                error: "ERROR 404 en el if/else del registro, parte del envío del mail."
                            });
                        }
                    }, 3000);

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

            sendEmail(email, name, newCheckCode, "code");

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
                        error: "error",
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
                            trys: trys,
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
            const token = generateToken(userExist, userExist.email);
            const template = "password";
            
            sendEmail(userExist.email, userExist.name, token, template);

            setTimeout(() => {
                if (getTestSendMail()) {
                    setTestSendMail(false);
                    return res.status(200).json({
                        user: userExist.email,
                        confirmationCode: "Link de cambio de contraseña enviado al mail",
                    })
                } else {
                    setTestSendMail(false);
                    return res.status(404).json({
                        message:"❌ Error en el envío del link para el cambio de contraseña ❌",
                        error: "ERROR 404 en el if/else del forgottenPassword, parte del envío del mail."
                    });
                }
            }, 3000);

            return
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
//* ---> Cambio de contraseña usando token en param
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
            console.log("Contraseña no segura");
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

//? --------------------------------- UPDATE USER -----------------------------------------
const updateUser = async(req,res,next) => {
    let catchImg = req.file?.path;

    try {
        
        await User.syncIndexes();

        const updateUser = new User(req.body);

        req.file && (updateUser.image = catchImg);

        if (
            !validator.isAlphanumeric(req.body.name) ||
            req.body.name.length > 20
        ) {
            return res.status(404).json({
                message: "❌ El nuevo nombre sólo puede contener letras y números y hasta 20 caracteres máximos ❌",
                error: "ERROR 404 en el if/else del updateUser comprobando si el nombre es válido",
            });
        } else {
            updateUser._id = req.user._id;
            updateUser.password = req.user.password;
            updateUser.role = req.user.role;
            updateUser.checkCode = req.user.checkCode;
            updateUser.email = req.user.email;
            updateUser.check = req.user.check;
            updateUser.favPosts = req.user.favPosts;
            updateUser.favProducts = req.user.favProducts;
            updateUser.status = req.user.status;
            updateUser.basket = req.user.basket;

            try {
                await User.findByIdAndUpdate(req.user._id, updateUser);
                if (req.file) deleteImgCloudinary(req.user.image);

                //testing
                const testUpdateUser = await User.findById(req.user._id);
                const updateKeys = Object.keys(req.body);
                const testUpdate = [];

                //* Recorre todas las keys que encontremos en el req.body
                updateKeys.forEach((item) => {
                    //* Compara si el usuario (en principio ya updated) coincide con la información del body
                    if (testUpdateUser[item] === req.body[item]) {
                        //* Si la información del usuario updated no coincide con la anterior, almacena el item con el boolean true.
                        if (testUpdateUser[item] != req.user[item]) {
                            testUpdate.push({ [item]: true });
                        } else {
                            testUpdate.push({
                                [item]: false,
                            });
                        }
                    } else {
                        testUpdate.push({ [item]: false });
                    }
                });

                if (req.file) {
                    testUpdateUser.image === catchImg
                        ? testUpdate.push({ image: true })
                        : testUpdate.push({ image: false });
                }

                return res.status(200).json({
                    message: "Petición de actualización de información exitosa",
                    testUpdate,
                });
            } catch (error) {
                if (req.file) deleteImgCloudinary(catchImg);
                return res.status(404).json({
                    message: "❌ No se actualizó la información en la DB ❌",
                    error: error,
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            message:
                "❌ Error en el try/catch general del updateUser ❌",
            error: error,
        });
    }
}

//? --------------------------------- DELETE USER -----------------------------------------
const deleteUser = async(req,res,next) => {
    try {
        const {_id,image} = req.user;
        const userDB = await User.findById(_id);
        try {

            //Borrado de usuario en la lista de todos los productos que tenga
            userDB.favProducts.forEach(async (item) => {
                await Product.findByIdAndUpdate(item, {
                    $pull: {
                        favUsers: _id,
                    },
                });
            })

        } catch (error) {
            //borrado de las listas
            return res.status(404).json({
                message: "❌ Listas de productos no vaciadas ❌",
                error: error,
            });
        }
        await User.findByIdAndDelete(_id);

        if (await User.findById(_id)) {
            return res.status(404).json({
                message:"❌ Usuario no borrado de la DB ❌",
                error: error,
            });
        } else {
            deleteImgCloudinary(image);
            return res.status(200).json({
                message:"Usuario borrado correctamente"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del deleteUser ❌",
            error: error,
        });
    }
}

//? ----------------------------- AÑADIR PRODUCTO A FAV -----------------------------------
const addFavProduct = async(req,res,next) => {
    try {
        const {id} = req.user;
        const product = req.body.product;
        const userExist = await User.findById(id);

        
        if (userExist.favProducts.includes(product)) {
            //* Modificamos el user
            try {
                await User.findByIdAndUpdate(id, {
                    $pull: {
                        favProducts: product,
                    },
                });
                //* Modificamos el producto
                try {
                    await Product.findByIdAndUpdate(product, {
                        $pull: {
                            favUsers: userExist._id,
                        },
                    });
                } catch (error) {
                    return res.status(404).json({
                        message:
                            "❌ No se pudo quitar el user de la lista de favoritos ❌",
                        error: error,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    message:"❌ No se pudo quitar el producto de la lista de favoritos ❌",
                    error: error,
                })
            }
        } else {
            try {
                await User.findByIdAndUpdate(id, {
                    $push: {
                        favProducts: product,
                    },
                });
                try {
                    await Product.findByIdAndUpdate(product, {
                        $push: {
                            favUsers: userExist._id,
                        },
                    });
                } catch (error) {
                    return res.status(404).json({
                        message:
                            "❌ No se pudo añadir el user a la lista de favoritos ❌",
                        error: error,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    message:
                        "❌ No se pudo añadir el producto a la lista de favoritos ❌",
                    error: error,
                });
            }
        }

        //testing

        try {
            const userUpdate = await User.findById(id);
            if(userUpdate.favProducts == userExist.favProducts){
                return res.status(404).json({
                    message: "❌ La lista de favoritos no se actualizó correctamente ❌",
                    error: "ERROR 404 en el if/else de addFavProduct al comprobar las listas"
                });
            } else {
                return res.status(200).json({
                    message: `${userExist.name}, se modificó tu lista de favoritos con éxito.`,
                    favProducts: userUpdate.favProducts,
                });
            }

        } catch (error) {
            return res.status(404).json({
                message:
                    "❌ No se encontró el user por id en el testeo ❌",
                error: error,
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del addFavProduct ❌",
            error: error,
        });
    }
}

//? ------------------------------- AÑADIR POST A FAV -------------------------------------
const addFavPost = async(req,res,next) => {
    try {
        const { id } = req.user;
        const post = req.body.post;
        const userExist = await User.findById(id);

        if (userExist.favPosts.includes(post)) {
            //* Modificamos el user
            try {
                await User.findByIdAndUpdate(id, {
                    $pull: {
                        favPosts: post,
                    },
                });

                //* Modificamos el post
                try {
                    await Post.findByIdAndUpdate(post, {
                        $pull: {
                            favUsers: userExist._id,
                        },
                    });
                } catch (error) {
                    return res.status(404).json({
                        message:
                            "❌ No se pudo quitar el user de la lista de favoritos ❌",
                        error: error,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    message:
                        "❌ No se pudo quitar el post de la lista de favoritos ❌",
                    error: error,
                });
            }
        } else {
            try {
                await User.findByIdAndUpdate(id, {
                    $push: {
                        favPosts: post,
                    },
                });

                try {
                    await Post.findByIdAndUpdate(post, {
                        $push: {
                            favUsers: userExist._id,
                        },
                    });
                } catch (error) {
                    return res.status(404).json({
                        message:
                            "❌ No se pudo añadir el user a la lista de favoritos ❌",
                        error: error,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    message:
                        "❌ No se pudo añadir el post a la lista de favoritos ❌",
                    error: error,
                });
            }
        }

        //testing

        try {
            const userUpdate = await User.findById(id);
            if (userUpdate.favPosts == userExist.favPosts) {
                return res.status(404).json({
                    message:
                        "❌ La lista de posts no se actualizó correctamente ❌",
                    error: "ERROR 404 en el if/else de addFavPost al comprobar las listas",
                });
            } else {
                return res.status(200).json({
                    message: `${userExist.name}, se modificó tu lista de posts favoritos con éxito.`,
                    favPosts: userUpdate.favPosts,
                });
            }
        } catch (error) {
            return res.status(404).json({
                message: "❌ No se encontró el user por id en el testeo ❌",
                error: error,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del addFavPosts ❌",
            error: error,
        });
    }
}

//? ------------------------- AÑADIR PRODUCTO AL CARRITO ----------------------------------
const addBasket = async(req,res,next) => {
    try {
        const { id } = req.user;
        const product = req.body.product;
        const userExist = await User.findById(id);

        if (userExist.basket.includes(product)) {
            //* Modificamos el user
            try {
                await User.findByIdAndUpdate(id, {
                    $pull: {
                        basket: product,
                    },
                });
            } catch (error) {
                return res.status(404).json({
                    message:
                        "❌ No se pudo quitar el producto del carrito ❌",
                    error: error,
                });
            }
        } else {
            try {
                await User.findByIdAndUpdate(id, {
                    $push: {
                        basket: product,
                    },
                });
            } catch (error) {
                return res.status(404).json({
                    message:
                        "❌ No se pudo añadir el producto al carrito ❌",
                    error: error,
                });
            }
        }

        //testing

        try {
            const userUpdate = await User.findById(id);
            if (userUpdate.basket == userExist.basket) {
                return res.status(404).json({
                    message:
                        "❌ El carrito no se actualizó correctamente ❌",
                    error: "ERROR 404 en el if/else de addBasket al comprobar las listas",
                });
            } else {
                return res.status(200).json({
                    message: `${userExist.name}, se modificó tu carrito con éxito.`,
                    basket: userUpdate.basket,
                });
            }
        } catch (error) {
            return res.status(404).json({
                message: "❌ No se encontró el user por id en el testeo ❌",
                error: error,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del addBasket ❌",
            error: error,
        });
    }
}

//? ------------------------------ ADMINISTRAR USER ---------------------------------------
const adminUser = async(req,res,next) => {
    try {
        await User.syncIndexes();
        const email = req.body.email;
        const userToUpdate = await User.findOne({email});

        await User.findByIdAndUpdate(userToUpdate._id, {
            status: req.body?.status ? req.body.status : userToUpdate.status,
            role: req.body?.role ? req.body.role : userToUpdate.role,
        });


        //testing


        try {
            const userUpdated = await User.findOne({email});

            if (
                userToUpdate.status == userUpdated.status
                && userToUpdate.role == userUpdated.role
            ) {
                return res.status(200).json({
                    message:"No se ha cambiado la información del usuario"
                })
            } else {
                return res.status(200).json({
                    message: "Se ha cambiado la información del usuario",
                });
            }
        } catch (error) {
            return res.status(404).json({
                message: "❌ No se llevo a cabo el testeo ❌",
                error: error,
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del adminUser ❌",
            error: error,
        });
    }
}

//? ------------------------------ GET USER BY EMAIL---------------------------------------
const getUserByEmail = async(req, res, next) => {
    try {
        const {email} = req.body;

        const userByName = await User.find({email});

        if (userByName.length > 0) {
            return res.status(200).json(userByName);
        } else {
            return res.status(404).json({
                message: "❌ No se encontró el user con ese mail ❌",
                error: "ERROR 404 en el if/else de getUserByName",
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del getUserByEmail ❌",
            error: error,
        });
    }
}


//? ------------------------------ GET USER LOGED ---------------------------------------
const getLogedUser = async(req, res, next) => {
    try {
        return res.status(200).json(req.user);

    } catch (error) {
        return res.status(500).json({
            message: "❌ Error en el try/catch general del getLogedUser ❌",
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
    updateUser,
    deleteUser,
    addFavProduct,
    addFavPost,
    addBasket,
    adminUser,
    getUserByEmail,
    getLogedUser
}