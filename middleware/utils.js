const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userAuth = async(req,res,next) =>{
    try{
        const cookies = req.cookies;
    const {token } = cookies;

    if(!token){
        return res.status(401).send("Invalid Token please login again");
    }

    const decoded = await jwt.verify(token,"Shane@123#");

    const {_id} = decoded;
   

    const user =  await User.findById(_id);
    

    if(!user){
        return res.status(401).send("User not found please login again");
        
    }
    req.user = user;
    next();
}catch(err){
    res.status(400).send("Error :"+  err.message)
}



}
module.exports= {userAuth};