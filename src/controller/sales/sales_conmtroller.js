const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')


const insertCompletedOrder = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId'])
        .input('TableId',req.body.TableId)
        .input('TotalAmount',req.body.TotalAmount)
        .input('Products',req.body.Products)
        .execute('usp_InsertCompletedOrder')
        return new CustomResponse(result.recordset,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    } 
}


module.exports = {insertCompletedOrder}