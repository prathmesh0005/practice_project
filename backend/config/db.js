import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config();

export const dbConection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.MYSQLPORT
});