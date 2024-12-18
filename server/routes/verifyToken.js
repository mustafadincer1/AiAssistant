const jwt = require('jsonwebtoken');


module.exports = function auth(req,res,next){
    const token = req.header('auth-token');

    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        next()
       
    }catch(error){
        res.status(400).send("Invalid Token");

    }
}
  
module.exports = function authStudent(req,res,next){
    const token = req.header('auth-token');

    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        if(req.user._role == "student"){
            next();
        }else{
            res.status(400).send("Invalid Token");
        }
       
    }catch(error){
        res.status(400).send("Invalid Token");

    }
}