const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://firstdbecomm:2dYMTnVGflIY4o0M@cluster0.40mvd1b.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{console.log("Database Connected");}).catch(err=>{console.log("Database not Connected"+err);});

const products = require("./products_data");

const Product = require("./products_schema")
app.get("/products",async(req, res) => {
    try{
        const items = await Product.find()
        res.json(items)

    }catch(err){
        res.send("Error "+ err)
    }
});

app.post("/products",async(req, res) => {
    const new_item = new Product({
        "productId": req.body.productId,
        "category": req.body.category,
        "productName": req.body.productName,
        "productModel": req.body.productModel,
        "price": req.body.price,
        "availableQuantity": req.body.availableQuantity
    })
    try{
        const item = await new_item.save()
        res.json(item)

    }catch(err){
        res.send("Error "+ err)
    }
});

app.listen(port, function() {
   console.log('Server started on port: ' + port);
});

// module.exports = app;
module.exports = products;