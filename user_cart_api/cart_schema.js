const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    "productId": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "productName": {
        type: String,
        required: true
    },
    "quantity": {
        type: String,
        required: true
    },
    "amount": {
        type: Number
    }
});
module.exports = mongoose.model("Cart", cartSchema);