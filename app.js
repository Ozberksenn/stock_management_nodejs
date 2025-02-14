const express = require('express');
const dotenv = require('dotenv')
var cors = require('cors') // cors hatalarınını önüne geçmek için ekledim.
const sql = require('./src/controller/menu/menu_controller');
const menuController = require('./src/controller/menu/menu_controller')
const logingController = require('./src/controller/login/login_controller')
const productsController = require('./src/controller/products/products_controller')
const notificationController = require('./src/controller/notification/notification_controller')
const { authMiddleware } = require('./src/middlewares/auth/auth_middleware');
const {upload,postImage} = require('./src/controller/upload_image/upload_image_controller')   
const app = express();
app.use(cors({
    origin: ['http://localhost:8080', 'https://helped-pig-glad.ngrok-free.app'],  // ✅ NGROK'u ekle!
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
//bands
app.get('/getBands',productsController.getBands)
app.post('/postBand',productsController.postBand)
app.post('/deleteBand',productsController.deleteBand)
//notification
app.get('/getNotification',notificationController.getNotification)
// menu
app.get('/getMenu',authMiddleware,menuController.getMenu)
app.post('/postMenu',authMiddleware,menuController.postMenu)
app.delete('/deleteMenu',authMiddleware,menuController.deleteMenu)
app.put('/updateMenu',authMiddleware,menuController.updateMenu) 
// upload image 
app.post('/uploadImage',upload.single('image'),postImage)
