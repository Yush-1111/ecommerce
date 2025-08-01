const mongoose = require("mongoose")

async function connectDB(){
    try{
       await mongoose.connect(process.env.MONGODB_URI)
    
        

    }catch (err) {
        
        throw new Error(err);
      }
}
module.exports = connectDB