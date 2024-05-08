const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

//Esquema de mongoose de los Users
//Cuidado en la key "Password" el error en la validación, que coincida con el front
//Cuidado en la key "Email" el error en la validación, que coincida con el front
//Los status del user son: "ok", "muted", "block"

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxLength: 20,
            minLength: 1,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: [
                validator.isStrongPassword,
                "La contraseña no es lo suficientemente segura",
            ],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "El mail es inválido"]
        },
        image: {
            type: String,
        },
        address: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: String,
            validate: [validator.isDate, "La fecha de nacimiento es inválida"]
        },
        favProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
        favPosts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
        listOfComments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
        check: {
            type: Boolean,
            default: false,
        },
        checkCode: {
            type: Number,
            required: true,
        },
        checkCodeTrys: {
            type: Number,
            required: true,
            default: 0,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["ok", "muted", "block"],
            default: "ok",
        },
        basket: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    },
    {
        timestamps: true,
    }
);

//Encriptado de la contraseña antes de guardar el User en la DB
UserSchema.pre("save", async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next("Error en el encriptado de la contraseña", error);
    };
});

const User = mongoose.model("User", UserSchema);

module.exports = User;