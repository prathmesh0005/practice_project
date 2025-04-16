import { dbConnection } from "../config/db.js";

export const allItems = async(req,res) =>{
    const q = "SELECT * FROM items";
    dbConnection.query(q,(err,data)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }else{
            return res.status(201).json({items:data});
        }
    });
}

