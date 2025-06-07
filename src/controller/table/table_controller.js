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


module.exports = {getTables,createTable}