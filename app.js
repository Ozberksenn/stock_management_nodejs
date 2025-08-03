const express = require('express');
const dotenv = require('dotenv')
var cors = require('cors') // cors hatalarınını önüne geçmek için ekledim.
const sql = require('./src/controller/menu/menu_controller');
const menuController = require('./src/controller/menu/menu_controller')
const logingController = require('./src/controller/login/login_controller')
const productsController = require('./src/controller/products/products_controller')
const tableController = require('./src/controller/table/table_controller')
const {reportCrtiticalStockQuantity} = require('./src/controller/reports/reports_controller')
const { authMiddleware } = require('./src/middlewares/auth/auth_middleware');
const {upload,uploadImage,cleanUnusedImages} = require('./src/controller/upload_image/upload_image_controller')   
const {uploadExcell} = require('./src/controller/upload_excell/upload_excell_controller')   
const {searchProduct} = require('./src/controller/app_controller')   
const {postCustomerContact, getCustomerContact, deleteCustomerContact} = require('./src/controller/admin/customer_contact')
const {getLogs} = require('./src/controller/admin/logger')
// const cron = require('node-cron');


// validations 
const { AuthValidation } = require('./src/middlewares/validation/auth.validation')

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: ['https://stock-management-ashy.vercel.app','https://qr-menu-react.vercel.app','https://qr-menu-client-one.vercel.app','http://localhost:8080','http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
dotenv.config() // dotenv 
app.listen(PORT,()=>{
    console.log('Port calisti')
})

app.use(express.json()); // bu satır çok önemli Express, gelen JSON verilerini doğru şekilde işlemek 
// için bir middleware kullanmalıdır. Eğer express.json() middleware'ini kullanmıyorsanız,
// req.body undefined olarak kalır.

// swagger
var swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use('/uploads', express.static('uploads')); //http://localhost:8080/uploads/1739391195139.jpg
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get('/', async (req,res) => {
    res.json({
        'message': 'Welcome'
    })
    // try {
    //     await cleanUnusedImages();
    //     console.log('[CRON] Blob temizlik işlemi tamamlandı.');
    // } catch (err) {
    //     console.error('[CRON] Blob temizlerken hata:', err.message);
    // }
})

// login 
app.post('/login',AuthValidation.login,logingController.loginCompany)
app.post('/createCompany',AuthValidation.register,logingController.createCompany)
app.post('/updatePassword',AuthValidation.update,authMiddleware,logingController.updatePassword)
// products
app.get('/getProducts',authMiddleware,productsController.getProducts)
app.get('/getProductsWithoutToken',productsController.getProductWithoutToken)// token olmadan products çekebiliriz. Qr için
app.post('/createProducts',authMiddleware,productsController.createProduct)
app.put('/updateProduct',authMiddleware,productsController.updateProduct)
app.delete('/deleteProduct',authMiddleware,productsController.deleteProduct)
app.put('/productOrderUpdate',authMiddleware,productsController.productOrderUpdate) // product sırasını güncellemek için kullanıldı.
// menu 
app.get('/getMenu',authMiddleware,menuController.getMenu)
app.get('/getMenuWithoutToken',menuController.getMenuWithoutToken) // token olmadan menüleri çekebiliriz. Qr için
app.post('/postMenu',authMiddleware,menuController.postMenu)
app.delete('/deleteMenu',authMiddleware,menuController.deleteMenu)
app.put('/updateMenu',authMiddleware,menuController.updateMenu) 
app.put('/menuOrderUpdate',authMiddleware,menuController.menuOrderUpdate) // menu sırasını güncellemek için kullanıldı.
// upload image 
app.post('/uploadImage',upload.single('file'),uploadImage) // image yükler
app.get('/cleanBlob',cleanUnusedImages) // blob srevisi kontrol eder datada olmayanları siler.
//sale
app.post('/findProductWithBarcode',authMiddleware,productsController.findProductWithBarcode) // barcode no ya göre barcode bulup getiriyor.
app.post('/updateProductQuantity',authMiddleware,productsController.updateProductQuantity) // stock miktarını güncelleyen api.
// company Info
app.get('/getCompanyInfo',authMiddleware,logingController.getCompanyInfo)
app.get('/getCompanyInfoWithoutToken',logingController.getCompanyInfoWithoutToken) // token olmadan company info çekebiliriz. Qr için
app.post('/updateCompanyInfo',authMiddleware,logingController.updateCompanyInfo)
// tables
app.get('/getTables',authMiddleware,tableController.getTables) // masaları çeker.
app.post('/createTable',authMiddleware,tableController.createTable) // masa ekler.
app.put('/updateTable',authMiddleware,tableController.updateTable) // seçilen masayı günceller.
app.delete('/deleteTable',authMiddleware,tableController.deleteTable) // seçili masayı siler.
// table products
app.post('/createTableProduct',authMiddleware,tableController.createTableProduct) // seçili masa içerisine bir ürün ekler.
app.delete('/deleteTableProduct',authMiddleware,tableController.deleteTableProduct) // seçili masa içerisinde ki seçilen ürünü siler.
//uploadExcell
app.post('/uploadExcell',authMiddleware,uploadExcell)
// search
app.post('/searchProduct',authMiddleware,searchProduct)
// admin 
app.post('/postCustomerContact',postCustomerContact), // misafirlerin form kayıt isteği.
app.delete('/deleteCustomerContact',deleteCustomerContact) // misafirlerin form kayıtlarını siler.
app.get('/getCustomerContact',authMiddleware,getCustomerContact) // misafirlerin sisteme kaydı için olan formu çeker.
app.get('/getLogs',authMiddleware,getLogs) // log kayıtlarını çeker.
// reports : 
app.get('/report-critical-stock-quantity',authMiddleware,reportCrtiticalStockQuantity) // stok adedi azalanların raporu. 


// zamanlayıcı : 
// cron.schedule('0 2 */3 * *', async () => {
//   try {
//     await cleanUnusedImages();
//     console.log('[CRON] Blob temizlik işlemi tamamlandı.');
//   } catch (err) {
//     console.error('[CRON] Blob temizlerken hata:', err.message);
//   }
// });