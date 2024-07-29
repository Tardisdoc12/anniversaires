const fs = require("fs");
const { parse } = require("csv-parse");
const { DateTime } = require("luxon");
const mariadb = require("mariadb")

const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

exports.parseFile = async () => {
    let data = [];
    let conn;
    return new Promise (async (resolve, reject) => {
        try{
            conn = await pool.getConnection();
            data = await conn.query("SELECT * FROM Quotes");
            const today = DateTime.now();
            // Convertissez cette date en un nombre (ex: YYYYMMDD) pour assurer l'unicité par jour
            const dateNumber = parseInt(today.toFormat('yyyyMMdd'));
            // Utilisez le nombre obtenu pour sélectionner une citation de manière cyclique
            const quoteIndex = dateNumber % data.length;
            return resolve(data[quoteIndex])
            
        }catch(err){
            return reject(err.message)
        }

    })
    

}
