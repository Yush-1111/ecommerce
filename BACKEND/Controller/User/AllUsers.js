const userModel = require("../models/userModel")

async function allUsers(req,res){
    try{
      console.log("userId all Users",req.userId)

      const allUser = await userModel.find(req.userId)

      res.json({
      message:"All-user",
      data:allUser,
      error:false,
      success:true
      })

    }catch(err){

        res.status(400).json({
            message: err.message || err,
            error :true,
            success:false,
        })
    }
}

module.exports = allUsers