const express = require("express"); 
const{connectDb} = require("../config/Database")
const cookieParser = require('cookie-parser');
const authRouter = require("../routers/auth");
const profileRouter = require("../routers/profile");
const feedRouter = require("../routers/feed");




const app = express();

app.use(cookieParser());  // Parses cookies
app.use(express.json());  // Parses JSON bodies.



app.use('/',authRouter);
app.use('/', profileRouter);
app.use('/', feedRouter);





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


