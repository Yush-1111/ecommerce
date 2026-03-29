const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const { email , password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
             throw new Error("Please provide password")
        }

        const normalizedEmail = email.trim().toLowerCase()

        const user = await userModel.findOne({ email: normalizedEmail })

       if(!user){
            throw new Error("User not found")
       }

       let checkPassword = false

       if(user.password){
        if(user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$")){
            checkPassword = await bcrypt.compare(password,user.password)
        }else{
            checkPassword = password === user.password

            if(checkPassword){
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password,salt)
                await userModel.findByIdAndUpdate(user._id,{ password : hashPassword })
            }
        }
       }

       console.log("checkPassoword",checkPassword)

       if(checkPassword){
        const userData = {
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            profilePic : user.profilePic,
        }
        
        const tokenData = {
            _id : user._id,
            email : user.email,
            role : user.role,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
        if(!token){
            throw new Error("Error while generating tokenLogin.")
        }

        return res.status(200).json({
            message : "Login successfully",
            data : token,
            token : token,
            user : userData,
            success : true,
            error : false
        })

       }else{
         throw new Error("Please check Password")
       }
        }catch(err){
        return res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController
