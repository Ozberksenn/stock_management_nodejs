const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')


getTables = async (req,res) => {
     const request = new sql.Request()
         try {
                let result = await request.input('CompanyId',req.company['companyId']).execute('usp_GetTables')
                return new CustomResponse(result.recordset,'Success').success(res)
            } catch (error) {
                return new CustomResponse({}, error.toString()).error500(res);
            }
}

createTable = async (req,res) => {
    const request = new sql.Request()
    try {
       let result = await request
        .input('TableNo',req.body.TableNo)
        .input('Status',req.body.Status)
        .input('CustomerName',req.body.CustomerName)
        .input('CustomerCount',req.body.CustomerCount)
        .input('SpecialText',req.body.SpecialText)
        .input('CompanyId',req.company['companyId'])
        .execute('usp_InsertTable')
         return new CustomResponse(result,'Table Added Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    }
}

updateTable = async (req,res) => {
      const request = new sql.Request()
    try {
       let result = await request
        .input('TableId',req.body.TableId)
        .input('TableNo',req.body.TableNo)
        .input('Status',req.body.Status)
        .input('CustomerName',req.body.CustomerName)
        .input('CustomerCount',req.body.CustomerCount)
        .input('SpecialText',req.body.SpecialText)
        .input('CompanyId',req.company['companyId'])
        .execute('usp_UpdateTable')
         return new CustomResponse(result,'Table Updated Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    }

}

deleteTable = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('TableId',req.body.TableId).execute('usp_DeleteTable')
        return new CustomResponse(result,"Table deleted successfully").success(res)
    } catch (error) {
          return new CustomResponse({}, error.toString()).error500(res);
    }
}

createTableProduct = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('ProductId',req.body.ProductId)
        .input('TableId',req.body.TableId)
        .input('CompanyId',req.body.CompanyId)
        .execute('usp_InsertTableProduct')
        return new CustomResponse(result,'Table Item Added Succesfully.').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

deleteTableProduct = async (req,res) => {
     const request = new sql.Request()
    try {
        let result = await request.input('TableId',req.body.TableId).execute('usp_DeleteTableProduct')
        return new CustomResponse(result,"Order deleted successfully").success(res)
    } catch (error) {
          return new CustomResponse({}, error.toString()).error500(res);
    }
}



module.exports = {getTables,createTable,createTableProduct,updateTable,deleteTable,deleteTableProduct}