const mariadb = require('mariadb');
 
const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

exports.parseServiceAddBirthday = (birthdate,name,lastname,email) => {
    
    return new Promise(async (resolve, reject) => {
        let conn;
        try{
            
            conn = await pool.getConnection();
            await conn.query("INSERT INTO Anniversaries (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",[birthdate,lastname,name,email])
            resolve(true);
        }catch(err){
            reject(err.message)
        }finally{
            if (conn) conn.release();
        }
    })
}