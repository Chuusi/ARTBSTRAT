const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},

        image: {type: String, required: true},

        description: {type: String},

        dimensions :{type: String},

        composition: {type: String},

        stock: {type: Number},

        price: {type: Number, required: true},

        offer: {type: Boolean, default: false},

        offerPrice: {type: Number, required: true},

        favUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps : true,
    }
);


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;