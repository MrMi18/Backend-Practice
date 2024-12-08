const express = require("express"); 
const{connectDb} = require("../config/Database")
const User = require('../models/user');


const app = express();

app.use(express.json());

app.post('/signup', async (req,res)=>{
    const user = new User(req.body);


    try{
        await user.save();
        res.send("hey suceessfully data send to database");
    }
    catch(err){
        res.status(400).send("bad Request    "+err.message);

    }

})

 app.get('/user', async(req,res)=>{
    const testname = req.body.firstName;
    
    try{
       const users =   await User.find({firstName:testname});
        if(users.length!=0){
       
            res.send(users);
        }else{
            res.status(404).send("user Not found with this email");
        }
    }catch(err){
        res.status(400).send("somthing went wrong   ");
    }
    
 })






connectDb()
.then(()=>{
    console.log("Database Connected Succesfully..");
    app.listen(3000,()=>{
        console.log("hey Server is running.....");
    });

})
.catch((err) =>{
    console.log("Database connection not established"+err.message)
});


