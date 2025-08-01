const productModel = require("../models/ProductModel")

const getProductController = async(req,res)=>{
    try{
    const allProduct =  await productModel.find().sort({createAt :-1})

    res.json({
    message: "All product",
    error:false,
    success:true,
    data:allProduct,
    })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success:false,
            })
    }
}
module.exports = getProductController