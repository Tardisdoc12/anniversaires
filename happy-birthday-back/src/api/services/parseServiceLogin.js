const fs = require("fs");
const mariadb = require('mariadb');
const bcrypt = require("bcrypt")

const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

exports.parseServiceLogin= (email,password) => {
    let results;

    return new Promise(async (resolve, reject) => {
        let conn;
        try{
            conn = await pool.getConnection();
            results = await conn.query("SELECT * FROM Users WHERE email=?",[email])
            console.log(results[0])
            if (results[0].length != 0){
                console.log(results[0].password)
                console.log(password)
                ok = await bcrypt.compare(password,results[0].password);
                if (!ok) {
                    resolve({success : false, message: 'Invalid email or password' });
                }
                resolve({success : true, message : 'connexion succeed',role:results[0].role});
            }else{
                resolve({success : false, message: 'Invalid email or password' });
            }
        }catch(err){
            reject(err.message)
        }finally{
            if (conn) conn.release();
        }
    })
}