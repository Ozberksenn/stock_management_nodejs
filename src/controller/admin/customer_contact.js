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
module.exports = {postCustomerContact}