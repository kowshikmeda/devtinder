const jwt= require("jsonwebtoken");
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Incorrect email address"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
        message:`{VALUE} is not valid gender type`,
       }
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender is not valid");
        //     }
        // }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password :"+value);
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Incorrect photo  url"+value);
            }
        }
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        default:"This is default of about us"

    },
    
   }, {
    timestamps:true,
});

userSchema.index({firstName:1,lastname:1});
userSchema.methods.getJWT= async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"dev",{expiresIn:"7d"});
    return token;
}


userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
   
    const passwordHash=user.password
     const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}


const User=mongoose.model("User",userSchema);

module.exports=User;

