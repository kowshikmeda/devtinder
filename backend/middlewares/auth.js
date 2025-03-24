const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
     const {token}=req.cookies;

     if(!token){
         throw new Error("Invalid token");
     }
        const decodedMsg=await jwt.verify(token,"dev");
        const {_id}=decodedMsg;
        const user=await User.findById({_id});
        if(!User){
            throw new Error("User not found");
        }
        req.user=user;
        next();
  

    }catch(err){
        res.send(err.message);
    }

}

module.exports={userAuth};