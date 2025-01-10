const express = require('express');

const {userAuth} = require('../middleware/utils');
const User = require('../models/user');

const feedRouter = express.Router();
feedRouter.get('/feed', userAuth, async (req,res)=>{
    try{

        const user = req.user;
        const allUser = User;
        // console.log(allUser);
       
        res.send( "users are:"+allUser);


    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})
module.exports = feedRouter;