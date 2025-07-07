const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')

insertLog = async (reqLog,resLog) => {
    // res.originalUrl = istek atılan api url
    // res.body = giden istekler
    // res.company = company bilgileri 
    // res.statusCode = dönen kod
    // res.statusMessage = dönen mesaj
    const request = new sql.Request()
    try {
         await request
        .input('Company', JSON.stringify(reqLog.company))
        .input('OriginalUrl',reqLog.originalUrl)
        .input('Body', JSON.stringify(reqLog.body))
        .input('StatusCode',resLog.statusCode.toString())
        .input('StatusMessage',resLog.statusMessage)
        .execute('usp_InsertLog');
        return {success: true, message: "Log created"};
    } catch (error) {
        return {success: false, message: error};
    }
}

getLogs = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.execute('usp_GetLogs')
        return new CustomResponse(result.recordset,'success').success(res)
    } catch (error) {
        return new CustomResponse([],error).error400(res)
    }
}



module.exports = {getLogs,insertLog}