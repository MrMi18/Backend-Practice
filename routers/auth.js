const express = require('express');
const jwt = require('jsonwebtoken');
const signupValidation = require('../Helper/signupValidation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middleware/utils');
const passwordValidation = require('../Helper/passwordValidatin')

const authRouter = express.Router();
authRouter.post('/signup', async (req,res)=>{

    const{firstName,lastName,password,emailID} = req.body;

    try{
        const alreadyExist = await User.findOne({emailId:emailID});
        if(alreadyExist){
            return res.send("User already exist with this email");
        }
    signupValidation(req);
    const passwordHash = await bcrypt.hash(password,10);
    // console.log(passwordHash);
        
    const user = new User({
        firstName,lastName,emailID,password:passwordHash
    });
    
        await user.save();
        
        const token = await jwt.sign({_id:user._id},"Shane@123#",{expiresIn:'7d'});


            res.cookie("token",token)

            res.json({data:user});
    }
    catch(err){
        console.log(err);
        res.status(400).json({data:err.message});

    }

});

authRouter.post('/login', async (req,res) =>{
    
    const {emailId,password} = req.body;

    try{
        const user =  await User.findOne({emailID:emailId});
        
        if(!user){
            return res.status(400).send("Wrong email or password  ");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

            const token = await jwt.sign({_id:user._id},"Shane@123#",{expiresIn:'7d'});


            res.cookie("token",token)

            res.json({data:user});
        }else{
            return res.status(401).send("Wrong email or password !");
           
        }
        
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
    
});

authRouter.post('/logout',(req,res)=>{
    // const {token} = req.cookies;
    res.clearCookie('token');
    res.send("Logout Sucessfull");

})

authRouter.patch('/user/edit/password/:userId', userAuth, async(req,res) =>{
    try{
    const user = req.user;
    const{ oldPassword ,newPassword} = req.body;
    
    
    const isPasswordValid = await bcrypt.compare(oldPassword,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid Password Old Password");
    }
    
    passwordValidation(newPassword);
    
    const newPasswordHash = await bcrypt.hash(newPassword,10);
    
    await User.findByIdAndUpdate(user._id,{password:newPasswordHash});
    res.send("Password Change sucessfully");
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})

    
module.exports = authRouter;


