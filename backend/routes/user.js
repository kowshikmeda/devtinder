const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();
const User=require("../models/user");
const USER_SAFE_DATA=["firstName","lastName","age","photoUrl","about","skills"]
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
       
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA)

        res.json({message:"data fetched successfully",data:connectionRequest})

    }catch(err){
        res.status(400).send(err.message)
    }
});

userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}],
           
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

         const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.equals(loggedInUser._id)){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data})

    }catch(err){
        res.status(400).send(err.message)
    }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const connectionRequest=await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
      
        const hideFromFeed=new Set();

        connectionRequest.forEach((req)=>{
            hideFromFeed.add(req.fromUserId.toString());
            hideFromFeed.add(req.toUserId.toString());
        })
      
     
        const users=await User.find({
            $and:[{_id:{$nin:Array.from(hideFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({data:users})



    }catch(err){
        res.status(400).send(err.message)
    }
})
module.exports=userRouter;