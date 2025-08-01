const multer  = require('multer') // image yüklerken kullandığım paket.
const path = require('path'); // image yüklerken dosya yolu için ekliyorum.
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

// todo : burada büyük dosya gönderme ve image harici dosya göndermememiz gerektiği önlemini almalıyım. !!! 
// Multer
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/');  // Dosyaların yükleneceği dizin
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));  // Dosya adı benzersiz yapılıyor
    }
}) 

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true); // Eğer jpeg veya png ise kabul et
//     } else {
//       cb(new Error('Sadece .jpeg ve .png  dosyalarına izin verilir!'), false); // Hata mesajı
//     }
//   };

const upload = multer({ storage: storage });


// const postImage = (req,res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//       }
//       res.send({
//         message: 'File uploaded successfully!',
//         file: req.file
//       });
// }

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    const containerName = 'stockcontainer'; 
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Dosya adı ve yolu
    const filePath = req.file.path;
    const blobName = req.file.filename;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Dosyayı Azure Blob'a yükle
    await blockBlobClient.uploadFile(filePath);

    const blobUrl = blockBlobClient.url;

    return res.status(200).json({
      message: 'File uploaded to Azure Blob Storage successfully!',
      blobUrl,
    });

  } catch (error) {
    console.error('Blob upload error:', error.message);
    return res.status(500).json({ error: 'Blob upload failed.' });
  }
};




module.exports = {upload,uploadImage};