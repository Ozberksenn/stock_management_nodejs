const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')


getTables = async (req,res) => {
     const request = new sql.Request()
         try {
                let result = await request.input('COMPANYID',req.company['companyId']).execute('GETTABLES')
                return new CustomResponse(result.recordset,'Success').success(res)
            } catch (error) {
                return new CustomResponse({}, error.toString()).error500(res);
            }
}

createTable = async (req,res) => {
    const request = new sql.Request()
    try {
       let result = await request
        .input('TABLE_NO',req.body.TABLE_NO)
        .input('STATUS',req.body.STATUS)
        .input('CUSTOMER_NAME',req.body.CUSTOMER_NAME)
        .input('CUSTOMER_COUNT',req.body.CUSTOMER_COUNT)
        .input('SPECIAL_TEXT',req.body.SPECIAL_TEXT)
        .input('COMPANYID',req.company['companyId'])
        .execute('CREATETABLE')
         return new CustomResponse(result,'Table Added Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    }
}

updateTable = async (req,res) => {
      const request = new sql.Request()
    try {
       let result = await request
        .input('ID',req.body.ID)
        .input('TABLE_NO',req.body.TABLE_NO)
        .input('STATUS',req.body.STATUS)
        .input('CUSTOMER_NAME',req.body.CUSTOMER_NAME)
        .input('CUSTOMER_COUNT',req.body.CUSTOMER_COUNT)
        .input('SPECIAL_TEXT',req.body.SPECIAL_TEXT)
        .input('COMPANYID',req.company['companyId'])
        .execute('UPDATETABLE')
         return new CustomResponse(result,'Table Updated Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    }

}

createTableProduct = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('PRODUCT_ID',req.body.PRODUCT_ID)
        .input('TABLE_ID',req.body.TABLE_ID)
        .input('COMPANYID',req.body.COMPANYID)
        .execute('CREATETABLEPRODUCT')
        return new CustomResponse(result,'Table Item Added Succesfully.').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


module.exports = {getTables,createTable,createTableProduct,updateTable}