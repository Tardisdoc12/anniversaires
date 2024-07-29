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
        try{
            const conn = await pool.getConnection();
            data = await conn.query("SELECT name, lastname FROM Anniversaries WHERE SUBSTRING(birthday, 1, 5) = ?",[birthdate])
            results.push(data)
            return results;
        }catch(err){
            throw Error("Problem with the request")
        }finally{
            if (conn) conn.release();
        }
    })
}