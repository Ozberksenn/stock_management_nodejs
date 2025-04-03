const sql = require('mssql');
// todo configi .env i.erisine alacağız. 
const config = {
    server:'localhost', // veya IP adresi
    database: 'STOCK',
    user: 'sa',
    password: '1',
    options: {
        encrypt: false, // Verilerin şifrelenmesi
        trustedConnection: false,
        port: 1433,  // Port numarasını belirtmek
    }
};

sql.connect(config, function(err,res) {
    if (err) console.log(err);
    console.log('successfully connect database')
    // Bağlantı başarılı olduğunda yapılacak işlemler buraya yazılır
  });

module.exports = sql