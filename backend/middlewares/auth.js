const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
     const {token}=req.cookies;

     if(!token){
         return res.status(401).send("Please Login!! ");
     }
        const decodedMsg=await jwt.verify(token,process.env.JWT_SECRET);
        const {_id}=decodedMsg;
        const user=await User.findById({_id});
        if(!User){
            throw new Error("User not found");
        }
        req.user=user;
        next();
  

    }catch(err){
        res.status(400).send(err.message);
    }

}

module.exports={userAuth};