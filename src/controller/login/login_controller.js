const sql = require('../../db/db_connection')
const jwt = require('jsonwebtoken')


loginCompany = async (req,res) => {
    const request = new sql.Request()
    try {
    const result = await request.input('MAIL',req.body.MAIL).input('PASSWORD',req.body.PASSWORD).execute('COMPANYLOGIN')
    if (!result.recordset || result.recordset.length === 0) {
        return res.json({
            statusCode : 401,
            message: 'Invalid mail or pasword!'
        });
    }      
    const company = result.recordset[0];
    const accessToken = jwt.sign(
        { companyId: company.ID,mail:company.MAIL,companyName:company.COMPANYNAME},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2d' }
    );

    const refreshToken = jwt.sign(
        { companyId: company.ID,mail:company.MAIL,companyName:company.COMPANYNAME},
        process.env.REFRESH_TOKEN_SECRET
    );

    return res.json({
        statusCode: res.statusCode,
        message: res.statusMessage,
        token: accessToken,
        refreshToken:refreshToken
    });
    } catch (error) {
        return res.json({
            statusCode : 401,
            message: error,
        });
    }
}

createCompany = async (req,res) => {
    const request = new sql.Request()
    try {
        let result =  await request.input('COMPANYNAME',req.body.COMPANYNAME)
        .input('MAIL',req.body.MAIL)
        .input('PASSWORD',req.body.PASSWORD)
        .input('PHONE',req.body.PHONE)
        .input('LOGO',req.body.LOGO)
        .input('BANNER',req.body.BANNER)
        .execute('CREATECOMPANY')
        return res.json({
            'statusCode' : res.statusCode,
            'message': res.statusMessage,
            'data':result.recordset[0]
        });
    } catch (error) {
        return res.json({
            'message': error
        });
    }
}

module.exports = {loginCompany,createCompany}
