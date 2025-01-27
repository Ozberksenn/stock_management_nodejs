const sql = require('../../db/db_connection')
const request = new sql.Request()

const getNotification = async (req,res) => {
    try {
        let result = await request.execute('GETNOTIFICATION')
        return res.json({
         'statusCode' : res.statusCode,
         'message': res.statusMessage,
         'data':result.recordset[0]
        })
    } catch (error) {
        return res.json({
            'message': error,
           })
    }
}


module.exports = {getNotification}