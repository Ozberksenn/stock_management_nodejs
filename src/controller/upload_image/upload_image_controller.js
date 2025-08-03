const sql = require('../../db/db_connection')
const multer  = require('multer') // image yüklerken kullandığım paket.
const path = require('path'); // image yüklerken dosya yolu için ekliyorum.
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const { Console } = require('console');
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

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp'  ) {
      cb(null, true); 
    } else {
      cb(new Error('Sadece .jpeg ve .png  dosyalarına izin verilir!'), false); // Hata mesajı
    }
  };

const upload = multer({
   storage: storage,
   limits: { fileSize: 2 * 1024 * 1024 },
   fileFilter : fileFilter
 });

function connectionBlobService (){
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = 'stockcontainer'; 
    return blobServiceClient.getContainerClient(containerName);
}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

   const containerClient = connectionBlobService()

    // Dosya adı ve yolu
    const filePath = req.file.path;
    const blobName = req.file.filename;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const fileBuffer = fs.readFileSync(filePath);
        // Dosyayı Azure Blob'a yükle
        await blockBlobClient.uploadData(fileBuffer,{
        blobHTTPHeaders: {
            blobContentType: 'image/png' // dinamik content type
          },
    });

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

const cleanUnusedImages = async () =>{
    const request = new sql.Request()
    try {
        const result = await request.query`SELECT Image FROM Products WHERE Image IS NOT NULL`;
        const dbImageNames = result.recordset.map(row => row.Image);

        const containerClient = connectionBlobService()


        const blobNames = [];
        for await (const blob of containerClient.listBlobsFlat()) {
          blobNames.push(`https://blobcontainerstock.blob.core.windows.net/stockcontainer/${blob.name}`);
        }

        const orphanBlobs = blobNames.filter(blob => !dbImageNames.includes(blob));  // veritabanında olmayanların listesini tutuyorum.

        for (const blobName of orphanBlobs) {
          const blobSplitedName = blobName.split('https://blobcontainerstock.blob.core.windows.net/stockcontainer/')[1]
          const blockBlobClient = containerClient.getBlockBlobClient(blobSplitedName);
          await blockBlobClient.deleteIfExists();
        }
    } catch (error) {
       console.error('Error Clean Images:', error.message);
    }
}




module.exports = {upload,uploadImage,cleanUnusedImages};