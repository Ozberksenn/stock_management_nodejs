const multer  = require('multer') // image yüklerken kullandığım paket.
const path = require('path'); // image yüklerken dosya yolu için ekliyorum.


// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Dosyaların yükleneceği dizin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));  // Dosya adı benzersiz yapılıyor
    }
}) 

const upload = multer({ storage: storage });



module.exports = {upload};