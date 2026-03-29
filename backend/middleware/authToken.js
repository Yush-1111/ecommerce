const jwt = require('jsonwebtoken');
async function authToken(req,res,next){
    try{
        const authorizationHeader = req.headers.authorization || ""
        const token = authorizationHeader.startsWith("Bearer ")
            ? authorizationHeader.split(" ")[1]
            : null

        console.log("token",token)
        if(!token){
            return res.status(400).json({
                message:"user not login",
                error:true,
                success:false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded) 
            if(err){
                console.log("auth-err",err)
                return res.status(401).json({
                    message:"Invalid token",
                    error:true,
                    success:false
                })
            }
            req.userId = decoded?._id
            next()
          });
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            data:[],
            error:true,
            success:false  
        })
    }
}
module.exports = authToken
