const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')


const reportCrtiticalStockQuantity = async (req,res) =>{
    const request = new sql.Request()
    try {
         const companyId = req.company['companyId'];
         let result = await request.input('COMPANYID',companyId).execute('report_critical_stock_quantity')
         return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
        
    }
}


module.exports = {reportCrtiticalStockQuantity}