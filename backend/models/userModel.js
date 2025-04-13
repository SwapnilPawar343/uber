
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name must be at least 3 characters'],
        },
        lastname:{
            type:String,
            minlength:[3,'last name must be at least 3 character long '],
        }
    },
email:{
    type:String,
    required:true,
    unique:true,
   minlength:[3,'email must be at least 10 characters long'],

},
password:{
    type:String,
    required:true,
    select :false ,  
     minlength:[3,'password must be at least 8 characters long'],
},
socketId:{
    type:String,
    default:null,
},
},);
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    return token;
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;