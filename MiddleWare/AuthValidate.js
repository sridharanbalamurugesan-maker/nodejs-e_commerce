const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
        try {
            const token=req.headers.authorization
            if(!token || !token.startsWith("Bearer ")){
                 return res.status(401).json({message:"No token, access denied"})
            }
            const actualToken=token.startsWith("Bearer ")?token.slice(7):token;
            // console.log(actualToken);
            const decode=jwt.verify(actualToken,"secretKey");
            // console.log(decode);
            req.user=decode;
            next();
        } catch (error) {
            res.status(401).json({message:"Invalid token"})
        }       
    }
module.exports=auth;