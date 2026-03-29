const productModel = require("../models/ProductModel")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q

        const regex = new RegExp(query,'i','g')

        const product = await productModel.find({
            "$or":[
                {
                    productName:regex,
                },
                {
                    category:regex,
                }
            ]
        })
        res.json({
            message:"search product list",
            data:product,
            error:false,
            success:true,

        })

        console.log("query",query)

    }catch{
        res.json({
            message:err.message || err,
            error:true,
            success:false,
        })
    }
}
module.exports = searchProduct