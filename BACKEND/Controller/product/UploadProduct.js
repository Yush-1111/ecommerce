const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../models/ProductModel")


async function UploadProductController(req,res){
    try{

        const sessionUserId  = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied")
        }
     const UploadProduct = new productModel(req.body)
     const saveProduct = await UploadProduct.save()
      
     res.json({
        message:"upload product successfuly",
        error:false,
        success:true,
        data:saveProduct,

     })

    }catch(err){
        res.status(400).json({
        message: err.message || err,
        error:true,
        success:false,
        })
    }
}
module.exports = UploadProductController