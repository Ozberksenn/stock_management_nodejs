const sql = require('../../db/db_connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


loginCompany = async (req,res) => {
    const request = new sql.Request()
    try {
    const result = await request.input('MAIL',req.body.MAIL).execute('COMPANYLOGIN')
    if (!result.recordset || result.recordset.length === 0) {
        return res.json({
            statusCode : 401,
            message: 'Invalid mail or pasword!'
        });
    }      
    const company = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(req.body.PASSWORD, company.PASSWORD);
    if (!isPasswordValid) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Invalid email or password!'
        });
    }
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
        const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10);
        let result =  await request.input('COMPANYNAME','')
        .input('MAIL',req.body.MAIL)
        .input('PASSWORD',hashedPassword)
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

getCompanyInfo = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId']).execute('GETCOMPANYINFO')
        return res.json({
            statusCode : 200,
            message : 'Success',
            data : result.recordset[0]
        })
    } catch (error) {
        return res.json({
            error : error.message
        })
    }
}
updateCompanyInfo = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('COMPANYID',req.company['companyId'])
        .input('COMPANYNAME',req.body.COMPANYNAME)
        .input('CONTACTMAIL',req.body.CONTACTMAIL)
        .input('PHONE',req.body.PHONE)
        .input('LOGO',req.body.LOGO)
        .input('QRURL',req.body.QRURL)
        .input('ADDRESS',req.body.ADDRESS)
        .input('INSTAGRAM',req.body.INSTAGRAM)
        .input('X',req.body.X)
        .input('FACEBOOK',req.body.FACEBOOK)
        .input('YOUTUBE',req.body.YOUTUBE)
        .input('WORKINGHOURS',req.body.WORKINGHOURS)
        .execute('UPDATECOMPANYINFO')
        return res.json({
            statusCode : 200,
            message : 'Success',
            data : result.recordset[0]
        })
    } catch (error) {
        return res.json({
            error : error.message
        })
    }
}

module.exports = {loginCompany,createCompany,getCompanyInfo,updateCompanyInfo}
