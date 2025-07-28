const sql = require('mssql');
require('dotenv').config();
 
const config = {
    server:process.env.SERVER, 
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        encrypt: true, 
        trustedConnection: false,
        // port: 1433,  // Port numarasını belirtmek
    }
};

sql.connect(config, function(err,res) {
    if (err) console.log(err);
    console.log('successfully connect database')
    // Bağlantı başarılı olduğunda yapılacak işlemler buraya yazılır
  });

module.exports = sql