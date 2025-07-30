const sql = require('../../db/db_connection')
const {CustomResponse} = require('../../utils/response')
const {insertLog} = require('../admin/logger')

getMenu = async (req,res) => {
    // req.company den login olmuş token bilgileri geliyor.
    const request = new sql.Request()
     try {
            let result = await request.input('CompanyId',req.company['companyId']).execute('usp_GetMenus')
            return new CustomResponse(result.recordset,'Success').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        }
}

getMenuWithoutToken = async (req,res) => {
    const request = new sql.Request()
     try {
            const companyId = req.query.companyId;
            let result = await request.input('CompanyId',companyId).execute('usp_GetMenus')
            return new CustomResponse(result.recordset,'Success').success(res)
        } catch (error) {
            return new CustomResponse({}, error.toString()).error500(res);
        }
}

postMenu = async (req,res) => {
    const request = new sql.Request()
        try {
             let result = await request.input('Name',req.body.Name)
             .input('CompanyId',req.body.CompanyId)
             .input('Description',req.body.Description)
             .input('Image',req.body.Image)
             .input('ShowStore',req.body.ShowStore)
             .execute('usp_InsertMenu')
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
            let result = await request.input('MenuId',req.body.MenuId).execute('usp_deleteMenu')
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
         let result = await request.input('MenuId',req.body.MenuId)
        .input('Name',req.body.Name)
        .input('Description',req.body.Description)
        .input('Image',req.body.Image)
        .input('ShowStore',req.body.ShowStore)
        .execute('usp_UpdateMenu')
        return new CustomResponse(result,'Menu Update Successfully').success(res)
    } catch (error) {
         return new CustomResponse({}, error.toString()).error500(res);
    } finally {
        insertLog(req,res);
    }
}

const menuOrderUpdate = async (req,res) => {
    const request = new sql.Request()
    try {
        let result = await request.input('CompanyId',req.company['companyId'])
        .input('MenuId',req.body.MenuId)
        .input('NewOrder',req.body.NewOrder)
        .execute('usp_UpdateMenuOrder')
        return new CustomResponse(result,'Success').success(res)
    } catch (error) {
        return new CustomResponse({}, error.toString()).error500(res);
    }
}

module.exports = {getMenu,getMenuWithoutToken,postMenu,deleteMenu,updateMenu,menuOrderUpdate};

