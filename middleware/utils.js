const adminAuth = (req,res,next) =>{
    const token = "abc";
    const isAuth = token === "xxx";
    if(!isAuth){
        res.status(401).send("unauthorised request");
    }else{
        
        next();
    }

}
module.exports= {adminAuth};