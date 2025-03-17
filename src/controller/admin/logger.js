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
        .input('COMPANY', JSON.stringify(reqLog.company))
        .input('ORIGINALURL',reqLog.originalUrl)
        .input('BODY', JSON.stringify(reqLog.body))
        .input('STATUSCODE',resLog.statusCode.toString())
        .input('STATUSMESSAGE',resLog.statusMessage)
        .execute('INSERTLOG');
        return {success: true, message: "Log created"};
    } catch (error) {
        return {success: false, message: error};
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



module.exports = {getLogs,insertLog}