const sql = require('../../db/db_connection')

const uploadExcell = (req,res) => {
     const request = new sql.Request()
     try {
       let result =  request.input('TABLENAME',req.body.TABLENAME).input('FILEPATH',req.body.FILEPATH).execute('UPLOADEXCELL')
       return new Response(result,'Uploaded Excell File').success(res) 
     } catch (error) {
        return new Response(data,error.message).error400(error)
     }

}



module.exports = {uploadExcell}