const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')

postCustomerContact = async (req,res) => {
    const request = new sql.Request()
    try {
        let result =  await request
        .input('ContactMail',req.body.ContactMail)
        .input('Phone',req.body.Phone)
        .input('CompanyName',req.body.CompanyName)
        .input('Description',req.body.Description)
        .execute('usp_InsertAdminCustomerContact');
        return new CustomResponse(result,'Successfully Contact').success(res)
    } catch (error) {
        return new CustomResponse([], "An error occurred").error400(res);
    }
}

getCustomerContact = async (req,res) =>{
    const request = new sql.Request()
    try {
        let result =  await request
        .execute('usp_GetCustomerContact');
        return new CustomResponse(result.recordset,'Successfully').success(res)
    } catch (error) {
        return new CustomResponse([], error.toString()).error500(res);
    }
}

deleteCustomerContact = async (req,res) => {
    const request = new sql.Request()
    try {
        await request
        .input('Customers',req.body.Customers)
        .execute('usp_DeleteCustomerContact');
        return new CustomResponse({},'success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


module.exports = {postCustomerContact,getCustomerContact,deleteCustomerContact}