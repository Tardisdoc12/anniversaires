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

exports.parseServiceBirthday = (birthdate) => {
    let results = [];

    return new Promise(async (resolve, reject) => {
        let conn;
        try{
            
            conn = await pool.getConnection();
            data = await conn.query("SELECT * FROM Anniversaries WHERE SUBSTRING(birthday, 1, 5) = ?",[birthdate])
            resolve(data);
        }catch(err){
            reject(err.message)
        }finally{
            if (conn) conn.release();
        }
    })
}