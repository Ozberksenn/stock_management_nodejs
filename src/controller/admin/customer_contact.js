const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')

postCustomerContact = async (req,res) => {
    const request = new sql.Request()
    try {
        let result =  await request
        .input('CONTACTMAIL',req.body.CONTACTMAIL)
        .input('PHONE',req.body.PHONE)
        .input('COMPANYNAME',req.body.COMPANYNAME)
        .input('DESCRIPTION',req.body.DESCRIPTION)
        .execute('POSTADMINCUSTOMERCONTACT');
        return new CustomResponse(result,'Successfully Contact').success(res)
    } catch (error) {
        return new CustomResponse([], "An error occurred").error400(res);
    }
}

getCustomerContact = async (req,res) =>{
    const request = new sql.Request()
    try {
        let result =  await request
        .execute('CUSTOMERCONTACTGET');
        return new CustomResponse(result.recordset,'Successfully').success(res)
    } catch (error) {
        return new CustomResponse([], error.toString()).error500(res);
    }
}

deleteCustomerContact = async (req,res) => {
    const request = new sql.Request()
    try {
        await request
        .input('CUSTOMERS',req.body.CUSTOMERS)
        .execute('CUSTOMER_CONTACT_DELETE');
        return new CustomResponse({},'success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


module.exports = {postCustomerContact,getCustomerContact,deleteCustomerContact}