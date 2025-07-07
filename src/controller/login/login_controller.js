const sql = require('../../db/db_connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {CustomResponse} = require('../../utils/response')


loginCompany = async (req,res) => {
    const request = new sql.Request()
    try {
    const result = await request.input('Mail',req.body.Mail).execute('usp_Login')
    if (!result.recordset || result.recordset.length === 0) {
        return new CustomResponse({}, 'Invalid email or password!').error401(res);
    }      
    const company = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(req.body.Password, company.Password);
    if (!isPasswordValid) {
        return new CustomResponse({}, 'Invalid email or password!').error401(res);
    }
    const accessToken = jwt.sign(
        { companyId: company.CompanyId,mail:company.Mail,companyName:company.CompanyName,role:company.Role},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2d' }
    );
    const refreshToken = jwt.sign(
        { companyId: company.CompanyId,mail:company.Mail,companyName:company.CompanyName,role:company.Role},
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

updatePassword = async (req,res) => {
    const request = new sql.Request()
    const updatePasswordRequest = new sql.Request()
    try {
        const result = await request.input('Mail',req.body.Mail).execute('usp_Login')
        if (!result.recordset || result.recordset.length === 0) {
            return new CustomResponse({}, 'Invalid email or password!').error401(res);
        }   
        const company = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(req.body.Password, company.Password);
        if (!isPasswordValid) {
            return new CustomResponse({}, 'Invalid email or password!').error401(res);
        }
        const hashedNewPassword = await bcrypt.hash(req.body.NewPassword, 10);
        await updatePasswordRequest.input('CompanyId',req.company['companyId']).input('NewPassword',hashedNewPassword.toString()).execute('usp_UpdatePassword')
        return new CustomResponse({},'password update success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error401(res);
    }
}


createCompany = async (req,res) => {
    const request = new sql.Request()
    try {
        const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10);
        await request.input('CompanyName',req.body.CompanyName)
        .input('Mail',req.body.Mail)
        .input('Password',hashedPassword)
        .input('Role',req.body.Role)
        .execute('usp_CreateCompany')
        return new CustomResponse({},'successfully').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


getCompanyInfo = async (req,res) => {
    const request = new sql.Request()
    try {
         let result = await request.input('CompanyId',req.company['companyId']).execute('usp_GetCompanyInfo')
         return new CustomResponse(result.recordsets[0],'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

getCompanyInfoWithoutToken = async (req,res) => {
    const request = new sql.Request()
    try {
         const companyId = req.query.companyId;
         let result = await request.input('CompanyId',companyId).execute('usp_GetCompanyInfo')
         return new CustomResponse(result.recordsets[0],'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}


updateCompanyInfo = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId'])
        .input('CompanyName',req.body.CompanyName)
        .input('ContactMail',req.body.ContactMail)
        .input('Phone',req.body.Phone)
        .input('Logo',req.body.Logo)
        .input('QrUrl',req.body.QrUrl)
        .input('Address',req.body.Address)
        .input('WorkingHours',req.body.WorkingHours)
        .input('SocialMedia',req.body.SocialMedia)
        .execute('usp_UpdateCompanyInfo')
        return new CustomResponse(result,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

module.exports = {loginCompany,createCompany,getCompanyInfo,getCompanyInfoWithoutToken,updateCompanyInfo,updatePassword}
