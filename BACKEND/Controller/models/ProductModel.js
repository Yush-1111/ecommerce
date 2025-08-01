const mongoose  = require("mongoose")


const productSchema =  new mongoose.Schema({
    productName:String,
    brandName:String,
    category:String,
    productImage:[],
    description:String,
    sellingPrice:Number,
    price:Number,
},{
    timestamps:true,


})
 const productModel = mongoose.model("product",productSchema)
 
 module.exports = productModel