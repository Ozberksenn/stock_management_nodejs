const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')

getMenu = async (req,res) => {
    // req.company den login olmuş token bilgileri geliyor.
    const request = new sql.Request()
     try {
            let result = await request.input('COMPANYID',req.company['companyId']).execute('GETMENU')
            return new CustomResponse(result.recordset,'Success').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        }
}

getMenuWithoutToken = async (req,res) => {
    const request = new sql.Request()
     try {
            const companyId = req.query.companyId;
            console.log(companyId)
            let result = await request.input('COMPANYID',companyId).execute('GETMENU')
            return new CustomResponse(result.recordset,'Success').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        }
}

postMenu = async (req,res) => {
    const request = new sql.Request()
        try {
             let result = await request.input('MENUNAME',req.body.MENUNAME)
             .input('COMPANYID',req.body.COMPANYID)
             .input('MENUDESCRIPTION',req.body.MENUDESCRIPTION)
             .input('MENUIMAGE',req.body.MENUIMAGE)
             .input('SHOWSTORE',req.body.SHOWSTORE)
             .execute('POSTMENU')
             return new CustomResponse(result,'Menu Added Successfully').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        } 
        finally {
             insertLog(req,res);
        }
}

deleteMenu = async (req,res) => {
    const request = new sql.Request()
        try {
            let result = await request.input('MENUID',req.body.MENUID).execute('DELETEMENU')
            return new CustomResponse(result,'Menu Deleted Successfully').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        }finally {
            insertLog(req,res);
        }
}

updateMenu = async (req,res) => {
    const request = new sql.Request()
    try {
         let result = await request.input('MENUID',req.body.MENUID)
        .input('MENUNAME',req.body.MENUNAME)
        .input('MENUDESCRIPTION',req.body.MENUDESCRIPTION)
        .input('MENUIMAGE',req.body.MENUIMAGE)
        .input('SHOWSTORE',req.body.SHOWSTORE)
        .execute('UPDATEMENU')
        return new CustomResponse(result,'Menu Update Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    } finally {
        insertLog(req,res);
    }
}

module.exports = {getMenu,getMenuWithoutToken,postMenu,deleteMenu,updateMenu};

