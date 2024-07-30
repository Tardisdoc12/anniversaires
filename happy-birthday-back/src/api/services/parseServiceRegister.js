const fs = require("fs");
const mariadb = require('mariadb');
 
const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

exports.parseServiceRegister = (firstname,lastname,email,password) => {
    let results = [];

    return new Promise(async (resolve, reject) => {
        let conn;
        let role = 1;
        try{
            conn = await pool.getConnection();
            await conn.query("INSERT INTO Users(firstname,lastname,email,password,role) VALUES (?,?,?,?,?)",[firstname,lastname,email,password,role])
            resolve({success : true, message : 'Utilisateur créer'});
        }catch(err){
            reject(err.message)
        }finally{
            if (conn) conn.release();
        }
    })
}