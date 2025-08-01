const mongoose  = require("mongoose")


const addToCart =  new mongoose.Schema({
    productId:{
        ref:"product",
        type:String,
    },
    quantity:Number,
    userId:String,
},{
    timestamps:true,


})
 const addToCardModel = mongoose.model("addToCart",addToCart)
 
 module.exports = addToCardModel