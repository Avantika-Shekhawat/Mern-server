import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ") )
    {
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
            if(err)
            {
                return res.status(403).json("token is in valid");
            }

            req.user = decoded;
            next();
        });
    }
    else{
         return res.status(401).json("please 1st login to add items to cart");
    }
};