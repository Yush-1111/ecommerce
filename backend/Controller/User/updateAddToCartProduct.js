const addToCardModel = require("../models/cartProduct")

const updateAddToCartProduct = async(req,res)=>{
try{

    const currentUserId  = req.currentUserId
    
    const addToCartProduct = req?.body?._id
    
    const qty = req.body.quantity
    
    const updateProduct = await addToCardModel.updateOne({_id: addToCartProduct},{
        ...(qty && {quantity : qty})
    })

    res.json({
        data :updateProduct,
        message:"update product",
        error:false,
        success:true
    })
}catch(err){
    res.json({
        message:err?.message || err,
        error:true,
        success:false,

    })
}
}
module.exports = updateAddToCartProduct

