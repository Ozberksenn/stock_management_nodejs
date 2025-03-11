const sql = require('../../db/db_connection')


const getProducts = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).execute('GETPRODUCTS')
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

const createProduct = async (req,res) => {
    const request = new sql.Request()
    try {
         let result = await request.input('MENUID',req.body.MENUID)
        .input('COMPANYID',req.body.COMPANYID)
        .input('PRODUCTNAME',req.body.PRODUCTNAME)
        .input('PRODUCTDESCRIPTION',req.body.PRODUCTDESCRIPTION)
        .input('SHOWSTORE',req.body.SHOWSTORE)
        .input('PRICE',req.body.PRICE)
        .input('COUNT',req.body.COUNT)
        .input('IMAGE',req.body.IMAGE)
        .input('BARCODE',req.body.BARCODE)
        .execute('CREATEPRODUCT')
        return res.json({
            'statusCode' : res.statusCode,
            'message': res.statusMessage,
           })
    } catch (error) {
        return res.json({
            'statusCode' : res.statusCode,
            'message': error,
           })
    }
} 

const updateProduct = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request
       .input('ID',req.body.ID)
       .input('MENUID',req.body.MENUID)
       .input('PRODUCTNAME',req.body.PRODUCTNAME)
       .input('PRODUCTDESCRIPTION',req.body.PRODUCTDESCRIPTION)
       .input('PRICE',req.body.PRICE)
       .input('COUNT',req.body.COUNT)
       .input('SHOWSTORE',req.body.SHOWSTORE)
       .input('IMAGE',req.body.IMAGE)
       .input('BARCODE',req.body.BARCODE)
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
    const request = new sql.Request()
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

// const getBands = async (req,res) => {
//     const request = new sql.Request()

//     try {
//         let result = await request.execute('GETBANDS')
//         return res.json({
//          'statusCode' : res.statusCode,
//          'message': res.statusMessage,
//          'data':result.recordset
//         })
//     } catch (error) {
//         return res.json({
//             'message': error,
//            })
//     }
// }

// const postBand = async (req,res) => {
//     const request = new sql.Request()
//     try {
//          await request
//         .input('NAME',req.body.NAME)
//         .input('LOGO',req.body.LOGO)
//         .execute('POSTBAND')
//         return res.json({
//          'statusCode' : res.statusCode,
//          'message': res.statusMessage
//         })
//     } catch (error) {
//         return res.json({
//             'message': error,
//            })
//     }
// }

// const deleteBand = async (req,res) => {
//     const request = new sql.Request()
//     try {
//          await request
//         .input('ID',req.body.ID)
//         .execute('DELETEBAND')
//         return res.json({
//          'statusCode' : res.statusCode,
//          'message': 'deleted band'
//         })
//     } catch (error) {
//         return res.json({
//             'message': error,
//            })
//     }
// }

const findProductWithBarcode = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).input('BARCODE',req.body.BARCODE).execute('FINDEPRODUCTWITHBARCODE')
        return res.status(200).json({
            statusCode: 200,
            data : result.recordsets[0]
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

const updateProductQuantity = async (req,res) => {
    // todo : company ID kontrolü backendde şu an yok yapılmalı.
    const request = new sql.Request()
    try {
        await request.input('COMPANYID',req.company['companyId']).input('PRODUCTJSONDATA',req.body.PRODUCTJSONDATA).execute('UPDATEPRODUCTQUANTITY')
        return res.status(200).json({
            statusCode: 200,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


module.exports= {getProducts,createProduct,deleteProduct,updateProduct,findProductWithBarcode,updateProductQuantity}