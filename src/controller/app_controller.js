const sql = require('../db/db_connection')
const response = require('../utils/response')

const searchProduct = async (req, res) => {
  const request = new sql.Request();
  try {
      let result = await request.input('COMPANYID', req.company['companyId'])
                          .input('PRODUCTNAME', req.body.PRODUCTNAME)
                          .execute('SEARCHPRODUCT');
       return new  response.CustomResponse(result.recordset,'success').success(res);
  } catch (error) {
       return new  response.CustomResponse(error, error.message).error400(res);
  }
}
module.exports = {searchProduct}
