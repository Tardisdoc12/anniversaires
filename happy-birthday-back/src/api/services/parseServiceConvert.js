const fs = require("fs");
const csv = require('csv-parser');
const mariadb = require('mariadb');
 
const pool = mariadb.createPool(
    {
        host: '127.0.0.1', 
        user: 'root', 
        database: "DrawDay",
        password: 'admin',
        connectionLimit: 5
});

const cleanRow = (row) => {
    const cleanedRow = {};
    for (const key in row) {
      const cleanedKey = key.trim(); // Enlever les espaces autour des noms de colonnes
      cleanedRow[cleanedKey] = row[key].replace(/(^"|"$)/g, ''); // Enlever les guillemets autour des valeurs
    }
    return cleanedRow;
};
  

exports.parseFile = (filePath) => {
    let results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' })) // Utiliser ';' comme délimiteur
      .on('data', (data) => results.push(cleanRow(data)))
      .on('end', async () => {
        try {
          const conn = await pool.getConnection();
          try{
            const exist = await conn.query('SELECT * FROM Anniversaries')
            if (!exist){
              await conn.query('CREATE TABLE Anniversaries (id INT AUTO_INCREMENT PRIMARY KEY, birthday VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL')
            }
          }catch(err){
            throw Error('Erreur avec la création de la table')
          }
          await conn.beginTransaction();

          for (const row of results) {
            console.log(row)
            // Ajustez cette requête en fonction de la structure de votre fichier CSV et de votre table
            await conn.query('INSERT INTO Anniversaries (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)', [row.birthday, row.lastname,row.firstname,row.email]);
          }

          await conn.commit();
          conn.release();

          // Supprimez le fichier après le traitement
          fs.unlinkSync(filePath);

          resolve('File processed and data inserted into database');
        } catch (err) {
          console.error('Error inserting data: ', err);
          reject('Error processing file');
        }
        });
    })
}