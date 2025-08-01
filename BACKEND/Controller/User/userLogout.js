async function userLogout(req,res){
    try{
         res.clearCookie("token")
         res.json({
           message:"Logout user successfully",
           error:false,
           success:true,
           data:[] 
         })


     }catch(err){
    res.status(400).json({
        message: err.message || err,
        error: true,
        success:false
    })
     }
} 
module.exports = userLogout