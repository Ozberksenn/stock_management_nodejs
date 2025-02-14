const multer  = require('multer') // image yüklerken kullandığım paket.
const path = require('path'); // image yüklerken dosya yolu için ekliyorum.

// todo : burada büyük dosya gönderme ve image harici dosya göndermememiz gerektiği önlemini almalıyım. !!! 
// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Dosyaların yükleneceği dizin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));  // Dosya adı benzersiz yapılıyor
    }
}) 

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true); // Eğer jpeg veya png ise kabul et
    } else {
      cb(new Error('Sadece .jpeg ve .png  dosyalarına izin verilir!'), false); // Hata mesajı
    }
  };

const upload = multer({ storage: storage });


const postImage = (req,res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      res.send({
        message: 'File uploaded successfully!',
        file: req.file
      });
}



module.exports = {upload,postImage};