const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    FirstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    MiddleName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    LastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    EmailId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    Age:{
        type:Number,
        min:8,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    ProblemSolved:{
        type:[String],
    },
    Password:{
        type:String,
        required:true
    }
},{timestamps : true});

const User = mongoose.model("user",userSchema);
module.exports = User;