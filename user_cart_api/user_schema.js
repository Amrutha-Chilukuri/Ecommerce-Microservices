const mongoose = require('mongoose');
const Cart = require("./cart_schema")

const userSchema = new mongoose.Schema({
    "userId": {
        type: String,
        required: true
    },
    "cart": {
        type: typeof([Cart,Cart]),
        required: true
    }
});
module.exports = mongoose.model("User", userSchema);