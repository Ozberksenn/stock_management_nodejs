const express = require('express');
const dotenv = require('dotenv')
var cors = require('cors') // cors hatalarınını önüne geçmek için ekledim.
const sql = require('./src/controller/menu/menu_controller');
const menuController = require('./src/controller/menu/menu_controller')
const logingController = require('./src/controller/login/login_controller')
const productsController = require('./src/controller/products/products_controller')
const { authMiddleware } = require('./src/middlewares/auth/auth_middleware');
const {upload,postImage} = require('./src/controller/upload_image/upload_image_controller')   
const {uploadExcell} = require('./src/controller/upload_excell/upload_excell_controller')   
const {searchProduct} = require('./src/controller/app_controller')   
const {postCustomerContact, getCustomerContact} = require('./src/controller/admin/customer_contact')
const {getLogs} = require('./src/controller/admin/logger')

const app = express();
app.use(cors({
    origin: ['http://localhost:8080', 'https://helped-pig-glad.ngrok-free.app','https://stock-management-ashy.vercel.app'],  // with NGROK
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization',"ngrok-skip-browser-warning"]
  }));
dotenv.config() // dotenv 
app.listen(8080,()=>{
    console.log('Port calisti')
})

app.use(express.json()); // bu satır çok önemli Express, gelen JSON verilerini doğru şekilde işlemek 
// için bir middleware kullanmalıdır. Eğer express.json() middleware'ini kullanmıyorsanız,
// req.body undefined olarak kalır.

// swagger
var swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use('/uploads', express.static('uploads')); // http://localhost:8080/uploads/1739391195139.jpg
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument))


app.get('/',(req,res) => {
    res.json({
        'message': 'welcome to stock management'
    })
})

// login
app.post('/login',logingController.loginCompany)
app.post('/createCompany',logingController.createCompany)
// products
app.get('/getProducts',authMiddleware,productsController.getProducts)
app.post('/createProducts',authMiddleware,productsController.createProduct)
app.put('/updateProduct',authMiddleware,productsController.updateProduct)
app.delete('/deleteProduct',authMiddleware,productsController.deleteProduct)
// menu 
app.get('/getMenu',authMiddleware,menuController.getMenu)
app.post('/postMenu',authMiddleware,menuController.postMenu)
app.delete('/deleteMenu',authMiddleware,menuController.deleteMenu)
app.put('/updateMenu',authMiddleware,menuController.updateMenu) 
// upload image 
app.post('/uploadImage',upload.single('image'),postImage)
//sale
app.post('/findProductWithBarcode',authMiddleware,productsController.findProductWithBarcode) // barcode no ya göre barcode bulup getiriyor.
app.post('/updateProductQuantity',authMiddleware,productsController.updateProductQuantity) // stock miktarını güncelleyen api.
// company Info
app.get('/getCompanyInfo',authMiddleware,logingController.getCompanyInfo)
app.post('/updateCompanyInfo',authMiddleware,logingController.updateCompanyInfo)
//uploadExcell
app.post('/uploadExcell',authMiddleware,uploadExcell)
// search
app.post('/searchProduct',authMiddleware,searchProduct)
// admin 
app.post('/postCustomerContact',postCustomerContact),
app.get('/getCustomerContact',authMiddleware,getCustomerContact)
app.get('/getLogs',getLogs) // log kayıtlarını çeker.