const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name, profilePic } = req.body

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const normalizedEmail = email.trim().toLowerCase()
        const trimmedName = name.trim()

        const user = await userModel.findOne({ email: normalizedEmail })

        console.log("user",user)

        if(user){
            throw new Error("User already exists.")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password,salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            name : trimmedName,
            email : normalizedEmail,
            profilePic : profilePic || "",
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        if(err?.code === 11000){
            return res.status(400).json({
                message : "User already exists.",
                error : true,
                success : false,
            })
        }

        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController
