const express = require('express')
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://firstdbecomm:2dYMTnVGflIY4o0M@cluster0.40mvd1b.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{console.log("Database Connected");}).catch(err=>{console.log("Database not Connected"+err);});

const products = require("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Node.js/product");
const users = require("./users");

const User = require("./user_schema")
const Cart = require("./cart_schema")
// replace the product api location below:
const Product = require("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Node.js/product/products_schema")

app.get("/products",async(req, res) => {
    try{
        const items = await Product.find()
        res.json(items)

    }catch(err){
        res.send("Error "+ err)
    }
});

app.post("/users",async(req, res) => {
    const new_user = new User({
        "userId": req.body.userId,
        "cart": req.body.cart
    })
    try{
        const user = await new_user.save()
        res.json(user)

    }catch(err){
        res.send("Error "+ err)
    }
});

app.get("/users/:id/cart",async(req, res) => {
    try{
        const user = await User.findOne({userId : parseInt(req.params.id)});
        if (!user) {res.send("User not found.");}
        else {res.send(user.cart);}

    }catch(err){
        res.send("Error "+ err)
    }
});

app.put("/users/:id/cart",async(req, res) => {
    const user = await User.findOne({userId : parseInt(req.params.id)});
    if (!user) {res.send("User not found.")}
    else {
        const inProducts = await Product.findOne({productId: req.body.productId});
        if (!inProducts) {res.send("Product not available.");}
        else if (inProducts.availableQuantity<parseInt(req.body.quantity))
        {
            res.send("Product available, but in less quantity.");
        }
        else {
            const item = user.cart.find(c => c.productId === req.body.productId);
            if (!item) { 
                try{
                    const new_item =  new Cart({
                        "productId": req.body.productId,
                        "category": req.body.category,
                        "productName": req.body.productName,
                        "quantity":parseInt(req.body.quantity),
                        "amount": parseInt(req.body.amount)
                    })
                    // user.cart.push(new_item);
                    // user.save();
                    // app.listen(port, function() {
                    //     console.log("req id " + req.params.id+" "+ new_item);
                    //  });
                    

                    let added = await User.findOneAndUpdate(
                        { userId: req.params.id}, 
                        { $push: { cart: new_item }}, {new:true}
                    )
                    
                    // const nitem = await new_item.save()
                    res.json(user.cart)
            
                }catch(err){
                    res.send("Error "+ err)
                }}
            else {
                try{
                    item.quantity = item.quantity + parseInt(req.body.quantity);
                    item.amount = item.amount + parseInt(req.body.amount);
                    const nitem = await item.save()
                    res.json(nitem)
            
                }catch(err){
                    res.send("Error "+ err)
                }
            }
            
            }
    }
});

// app.get("/products",(req, res) => {
//     res.send(products);
// });
// app.get("/users/:id/cart",(req, res) => {
//     const user = users.find(c => c.userId === parseInt(req.params.id));
//     if (!user) res.send("User not found.")
//     res.send(user.cart);
// });
// app.put("/users/:id/cart",(req, res) => {
//     const user = users.find(c => c.userId === parseInt(req.params.id));
//     if (!user) {res.send("User not found.")}
//     else {
//         const inProducts = products.find(c => c.productId === req.body.productId);
//         if (!inProducts) {res.send("Product not available.");}
//         if (inProducts.availableQuantity<parseInt(req.body.quantity))
//         {
//             res.send("Product available, but in less quantity.");
//         }
//         else {
//             const item = user.cart.find(c => c.productId === req.body.productId);
//             if (!item) {
//                 const new_item = {
//                     "productId": req.body.productId,
//                     "category": req.body.category,
//                     "productName": req.body.productName,
//                     "quantity":parseInt(req.body.quantity),
//                     "amount": parseInt(req.body.amount)
//                 };
//                 user.cart.push(new_item);
//                 res.send(new_item);}
//             else {
//                 item.quantity = item.quantity + parseInt(req.body.quantity);
//                 item.amount = item.amount + parseInt(req.body.amount);
//                 res.send(user.cart);
//             }
            
//             }
//     }
// });
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});

