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
   
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
        
    const user = new User({
        firstName,lastName,emailID,password:passwordHash
    });
        signupValidation(req);
        await user.save();
        res.send("hey suceessfully data send to database");
    }
    catch(err){
        res.status(400).send("bad Request    "+err.message);

    }

});

authRouter.post('/login', async (req,res) =>{

    const {emailID,password} = req.body;

    try{
        const user =  await User.findOne({emailID:emailID});
        
        if(!user){
            throw new Error("Wrong email or password  ");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

            const token = await jwt.sign({_id:user._id},"Shane@123#",{expiresIn:'7d'});


            res.cookie("token",token)

            res.send(`Login Successfull Wellcome ${user.firstName}`);
        }else{
            throw new Error("Wrong email or password ");
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


