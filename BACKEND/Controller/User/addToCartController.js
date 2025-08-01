const addToCardModel = require("../models/cartProduct")

const addToCardController = async(req,res)=>{
    try{
        const {productId} = req?.body
        const currentUser = req.userId

        

        const isProductAvailable = await addToCardModel.findOne({productId})
        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message:" allready exits in add to card ",
                error:true,
                success:false,
            })
        }

        const payload = {
            productId:productId,
            quantity:1,
            userId:currentUser,
        }

        const newAddToCart = new addToCardModel(payload)
        const saveProduct = await newAddToCart.save()

         return res.json({
            data:saveProduct,
            message:" Product Added in cart",
            success:true,
            error:false
        })

    }catch(err){
        res.json({
            messsage: err?.message || err,
            error: true,
            success:false,
        })
    }
}

module.exports = addToCardController