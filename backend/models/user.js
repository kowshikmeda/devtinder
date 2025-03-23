const mongoose=require("mongoose");
const validator=require("validator");
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
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
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
        default:"url",
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

const User=mongoose.model("User",userSchema);

module.exports=User;

