const sql = require('../../db/db_connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {CustomResponse} = require('../../utils/response')


loginCompany = async (req,res) => {
    const request = new sql.Request()
    try {
    const result = await request.input('MAIL',req.body.MAIL).execute('COMPANYLOGIN')
    if (!result.recordset || result.recordset.length === 0) {
        return new CustomResponse({}, 'Invalid email or password!').error401(res);
    }      
    const company = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(req.body.PASSWORD, company.PASSWORD);
    if (!isPasswordValid) {
        return new CustomResponse({}, 'Invalid email or password!').error401(res);
    }
    const accessToken = jwt.sign(
        { companyId: company.ID,mail:company.MAIL,companyName:company.COMPANYNAME,role:company.ROLE},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2d' }
    );
    const refreshToken = jwt.sign(
        { companyId: company.ID,mail:company.MAIL,companyName:company.COMPANYNAME,role:company.ROLE},
        process.env.REFRESH_TOKEN_SECRET
    );
    return new CustomResponse({
        token: accessToken,
        refreshToken:refreshToken
    },res.statusMessage).success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error401(res);
    }
}

createCompany = async (req,res) => {
    const request = new sql.Request()
    try {
        const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10);
        await request.input('COMPANYNAME',req.body.COMPANYNAME)
        .input('MAIL',req.body.MAIL)
        .input('PASSWORD',hashedPassword)
        .input('ROLE',req.body.ROLE)
        .execute('CREATECOMPANY')
        return new CustomResponse({},'created company').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

getCompanyInfo = async (req,res) => {
    const request = new sql.Request()
    try {
         let result = await request.input('COMPANYID',req.company['companyId']).execute('GETCOMPANYINFO')
         return new CustomResponse(result.recordsets[0],'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
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
        .input('WORKINGHOURS',req.body.WORKINGHOURS)
        .input('SOCIALMEDIA',req.body.SOCIALMEDIA)
        .execute('UPDATECOMPANYINFO')
        return new CustomResponse(result,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

module.exports = {loginCompany,createCompany,getCompanyInfo,updateCompanyInfo}
