import jwt from 'jsonwebtoken';
import { dbConection } from '../config/db.js';


export const  verifyJWT = (req, res, next) =>{
    try {
    const token = req.cookies?.access_token || req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(400).json({message:"token not found"})
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE);


    const q = "SELECT * FROM users WHERE id = ?"

    dbConection.query(q,[decodedToken.id], (err,data)=>{
        if(err) return res.status(500).json({error:err.message});

        if (data.length === 0) {
            return res.status(400).json({message:"User not found"})
        }
        const dbUser = data[0]
        
        req.user = dbUser;
        next();
    });

    
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}




