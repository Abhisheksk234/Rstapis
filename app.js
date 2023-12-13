const bodyParser = require("body-parser");
const express = require("express")
const mongoose = require("mongoose")
const app = express();


mongoose.connect("mongodb://localhost:27017/Sample", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected with mongodb");
}).catch((err) => {
    console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
})


const Product = new mongoose.model("Product", productSchema)

//create product
//http://localhost:4500/api/v1/product/new     use post
app.post("/api/v1/product/new", async (req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })

})

//to read
//http://localhost:4500/api/v1/products    use get

app.get("/api/v1/products", async (req, res) => {
    const product = await Product.find();
    res.status(200).json({
        success: true,
        product
    })
})

// to update

// //http://localhost:4500/api/v1/product/6578926bd8659d6b16150d09
// app.put("/api/v1/product/:id", async (req, res) => {

//     if(!product){
//         return res.status(500).json({
//     success:false,
//     message:"Product not found"
    
//         })
//     }
//     let product = await Product.findById(req.params.id);
//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         useFindAndModify: true,
//         runValidators: true

//     })
//     res.status(200).json({
//         success: true,
//         product
//     })
// })

// //to delete
// //http://localhost:4500/api/v1/product/6578926bd8659d6b16150d09

// app.delete("/api/v1/product/:id", async (req, res) => {
//     const product = await Product.findById(req.params.id);
// if(!product){
//     return res.status(500).json({
// success:false,
// message:"Product not found"

//     })
// }

// await product.remove();

//     res.status(200).json({
//         success: true,
//        message: "product is deleted sucessfully"
// })
// });





app.listen(4500, () => {
    console.log("server is working http://localhost:4500");
})