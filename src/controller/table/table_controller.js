const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')


getTables = async (req,res) => {
     const request = new sql.Request()
         try {
                let result = await request.input('COMPANY_ID',req.company['companyId']).execute('GETTABLES')
                return new CustomResponse(result.recordset,'Success').success(res)
            } catch (error) {
                return new CustomResponse({}, error.toString()).error500(res);
            }
}



module.exports = {getTables}