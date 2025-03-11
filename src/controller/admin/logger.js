const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')

insertLog = async (companyId,procedure) => {
    const request = new sql.Request()
    try {
        let result =  await request
        .input('COMPANYID',companyId)
        .input('URL',procedure)
        .execute('INSERTLOG');
             res.json({
                success : true,
                message : 'created log'  
            })
        return { success: true, message: "Log created", data: result.recordset};
    } catch (error) {
        return { success: false, message: error};
    }
}

getLogs = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.execute('LOG_GET')
        return new CustomResponse(result.recordset,'All Logs').success(res)
    } catch (error) {
        return new CustomResponse([],error).error400(res)
    }
}




module.exports = {getLogs}