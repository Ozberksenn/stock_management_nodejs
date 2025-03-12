const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')

const getProducts = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).execute('GETPRODUCTS')
        return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
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
        return new CustomResponse(result,'Product Added Successfully').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
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
       return new CustomResponse(result,'Product Update Successfully').success(res)
   } catch (error) {
    return new CustomResponse({}, error.toString()).error500(res);
   }
}

const deleteProduct = async (req,res) =>{
    const request = new sql.Request()
    try {
       let result =  await request.input('ID',req.body.ID).execute('DELETEPRODUCT')
        return new CustomResponse(result,'Product Deleted Successfully').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


const findProductWithBarcode = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).input('BARCODE',req.body.BARCODE).execute('FINDEPRODUCTWITHBARCODE')
        return new CustomResponse(result.recordsets[0],'Success').success(res) // todo : procedure içinde Top ile 1 dönebilirm.
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

const updateProductQuantity = async (req,res) => {
    // todo : company ID kontrolü backendde şu an yok yapılmalı.
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).input('PRODUCTJSONDATA',req.body.PRODUCTJSONDATA).execute('UPDATEPRODUCTQUANTITY')
        return new CustomResponse(result,'Success').success(res) // todo : procedure içinde Top ile 1 dönebilirm.
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


module.exports= {getProducts,createProduct,deleteProduct,updateProduct,findProductWithBarcode,updateProductQuantity}