const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')

const getProducts = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.execute('usp_GetProducts')
        return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    } 
}

const getProductByMenuId = async (req,res) => {
    const menuId = req.query.MenuId;
    const request = new sql.Request()
    try {
        let result = await request.input('MenuId',menuId).execute('usp_GetProductsByMenuId')
        return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    } 
}

const getProductWithoutToken = async (req,res) =>{
    const request = new sql.Request()
    try {
         const companyId = req.query.companyId;
         let result = await request.input('CompanyId',companyId).execute('usp_GetProducts')
          return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
        
    }
}

const createProduct = async (req,res) => {
    const request = new sql.Request()
    try {
         let result = await request
        .input('MenuId',req.body.MenuId)
        .input('CompanyId',req.body.CompanyId)
        .input('ProductName',req.body.ProductName)
        .input('ProductDescription',req.body.ProductDescription)
        .input('ShowStore',req.body.ShowStore)
        .input('Price',req.body.Price)
        .input('Quantity',req.body.Quantity)
        .input('Image',req.body.Image)
        .input('Barcode',req.body.Barcode)
        .input('ProductVariants',req.body.ProductVariants)
        .execute('usp_InsertProduct')
        return new CustomResponse(result,'Product Added Successfully').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    } finally {
        insertLog(req,res)
    }
} 

const updateProduct = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request
        .input('ProductId',req.body.ProductId)
        .input('MenuId',req.body.MenuId)
        .input('ProductName',req.body.ProductName)
        .input('ProductDescription',req.body.ProductDescription)
        .input('ShowStore',req.body.ShowStore)
        .input('Price',req.body.Price)
        .input('Quantity',req.body.Quantity)
        .input('Image',req.body.Image)
        .input('Barcode',req.body.Barcode)
        .input('ProductVariants',req.body.ProductVariants)
       .execute('usp_UpdateProduct')
       return new CustomResponse(result,'Product Update Successfully').success(res)
   } catch (error) {
    return new CustomResponse({}, error.toString()).error500(res);
   } finally {
    insertLog(req,res)
}
}

const deleteProduct = async (req,res) =>{
    const request = new sql.Request()
    try {
        let result =  await request.input('ProductId',req.body.ProductId).execute('usp_DeleteProduct')
        return new CustomResponse(result,'Product Deleted Successfully').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    } finally {
        insertLog(req,res)
    }
}


const findProductWithBarcode = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId']).input('Barcode',req.body.Barcode).execute('usp_GetFindProductWithBarcode')
        return new CustomResponse(result.recordsets[0],'Success').success(res) // todo : procedure içinde Top ile 1 dönebilirm.
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

const updateProductQuantity = async (req,res) => {
    // todo : company ID kontrolü backendde şu an yok yapılmalı.
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId']).input('ProductJsonData',req.body.ProductJsonData).execute('usp_UpdateProductQuantity')
        return new CustomResponse(result,'Success').success(res) // todo : procedure içinde Top ile 1 dönebilirm.
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


const productOrderUpdate = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId'])
        .input('ProductId',req.body.ProductId)
        .input('NewOrder',req.body.NewOrder)
        .execute('usp_UpdateProductOrder')
        return new CustomResponse(result,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


module.exports= {getProducts,getProductByMenuId,getProductWithoutToken,createProduct,deleteProduct,updateProduct,findProductWithBarcode,updateProductQuantity,productOrderUpdate}