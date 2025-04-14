const userModel = require("../models/userModel");
const captainModel = require("../models/captainModel");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListedToken = require("../models/blacklistToken");

const authUser = async (req, res, next) => {  
const token= req.cookies.token || req.headers['authorization']?.split(' ')[1];
if(!token){
    return res.status(401).json({message:"Unauthorized"});

}
const isBlackListed = await blackListedToken.findOne({token : token});
if(isBlackListed){
    return res.status(401).json({message:"Unauthorized"});
}
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findById(decoded._id);
    req.user=user;
   return  next(); }
catch(err){
    return res.status(401).json({message:"Unauthorized"});
}
}
const authCaptain = async (req, res, next) => {

    const token= req.cookies.token || req.headers['authorization']?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    
    }
    const isBlackListed = await blackListedToken.findOne({token : token});
    
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain;
       return  next(); }
    catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthorized"});
    }
}
module.exports={authUser,authCaptain};