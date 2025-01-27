const sql = require('../../db/db_connection')
const request = new sql.Request()


const getProducts = async (req,res) => {
    try {
        let result = await request.execute('GETPRODUCTS')
        return res.json({
         'statusCode' : res.statusCode,
         'message': res.statusMessage,
         'data':result.recordset[0]
        })
    } catch (error) {
        return res.json({
            'message': error,
           })
    }
  
}

const createProduct = async (req,res) => {
    try {
         let result = await request.input('MENUID',req.body.MENUID)
        .input('PRODUCTNAME',req.body.PRODUCTNAME)
        .input('PRODUCTDESCRIPTION',req.body.PRODUCTDESRIPTION)
        .input('PRICE',req.body.PRICE)
        .input('COUNT',req.body.COUNT)
        .input('IMAGE',req.body.IMAGE)
        .input('BANDID',req.body.BANDID)
        .execute('CREATEPRODUCT')
        return res.json({
            'statusCode' : res.statusCode,
            'message': res.statusMessage,
            'data' : result
           })
    } catch (error) {
        return res.json({
            'statusCode' : res.statusCode,
            'message': error,
           })
    }
} 

const updateProduct = async (req,res) => {
    try {
        let result = await request.
        input('ID',req.body.ID)
       .input('MENUID',req.body.MENUID)
       .input('PRODUCTNAME',req.body.PRODUCTNAME)
       .input('PRODUCTDESCRIPTION',req.body.PRODUCTDESRIPTION)
       .input('PRICE',req.body.PRICE)
       .input('COUNT',req.body.COUNT)
       .input('IMAGE',req.body.IMAGE)
       .input('BANDID',req.body.BANDID)
       .execute('UPDATEPRODUCTS')
       return res.json({
           'statusCode' : res.statusCode,
           'message': res.statusMessage,
           'data' : result
          })
   } catch (error) {
       return res.json({
           'statusCode' : res.statusCode,
           'message': error,
          })
   }
}

const deleteProduct = async (req,res) =>{
    try {
        await request.input('ID',req.body.ID).execute('DELETEPRODUCT')
        return res.json({
            'statusCode' : res.statusCode,
            'message': 'success deleted',
           })
    } catch (error) {
        return res.json({
            'statusCode' : res.statusCode,
            'message': error,
           })
    }
}

const getBands = async (req,res) => {
    try {
        let result = await request.execute('GETBANDS')
        return res.json({
         'statusCode' : res.statusCode,
         'message': res.statusMessage,
         'data':result.recordset
        })
    } catch (error) {
        return res.json({
            'message': error,
           })
    }
}

const postBand = async (req,res) => {
    try {
         await request
        .input('NAME',req.body.NAME)
        .input('LOGO',req.body.LOGO)
        .execute('POSTBAND')
        return res.json({
         'statusCode' : res.statusCode,
         'message': res.statusMessage
        })
    } catch (error) {
        return res.json({
            'message': error,
           })
    }
}

const deleteBand = async (req,res) => {
    try {
         await request
        .input('ID',req.body.ID)
        .execute('DELETEBAND')
        return res.json({
         'statusCode' : res.statusCode,
         'message': 'deleted band'
        })
    } catch (error) {
        return res.json({
            'message': error,
           })
    }
}


module.exports= {getProducts,createProduct,deleteProduct,updateProduct,getBands,postBand,deleteBand}