import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config();

// export const dbConnection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password:process.env.PASSWORD,
//     database: process.env.DB,
//     port: process.env.MYSQLPORT
// });

export const dbConnection = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.MYSQLPORT
});

// export const DB = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "Tesla",
//     port: 3306
// })

// export const connectionCheck = DB.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected!")
// })