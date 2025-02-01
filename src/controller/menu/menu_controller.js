const sql = require('../../db/db_connection')

getMenu = async (req,res) => {
    // req.company den login olmuş token bilgileri geliyor.
    const request = new sql.Request()
     try {
            let data = await request.input('COMPANYID',req.company['companyId']).execute('GETMENU')
            return res.json({
                'statusCode' : res.statusCode,
                'message': res.statusMessage,
                'data':data.recordset
            });  // Sonucu JSON formatında döndür
        } catch (error) {
           return res.json({ 'message': error});
        }
}

postMenu = async (req,res) => {
    const request = new sql.Request()
        try {
             await request.input('MENUNAME',req.body.MENUNAME)
             .input('COMPANYID',req.body.COMPANYID)
            .input('MENUDESCRIPTION',req.body.MENUDESCRIPTION)
            .input('MENUIMAGE',req.body.MENUIMAGE)
            .execute('POSTMENU')
             return res.json({
                'statusCode' : res.statusCode,
                'message' : res.statusMessage,
            })
        } catch (error) {
           return  res.json({
                'message' : error
            })
        }
}

deleteMenu = async (req,res) => {
       const request = new sql.Request()
        try {
            await request.input('MENUID',req.body.MENUID).execute('DELETEMENU')
            return res.json({
                'statusCode' : res.statusCode,
                'message' : res.statusMessage,
            })
        } catch (error) {
            return res.json({
                'message' : error
            })
        }
}

updateMenu = async (req,res) => {
    const request = new sql.Request()
    try {
         let data = await request.input('MENUID',req.body.MENUID)
        .input('MENUNAME',req.body.MENUNAME)
        .input('MENUDESCRIPTION',req.body.MENUDESCRIPTION)
        .input('MENUIMAGE',req.body.MENUIMAGE)
        .execute('UPDATEMENU')
       return  res.json({
            'statusCode' : res.statusCode,
            'message' : res.statusMessage,
            'data': data.recordset
        })
    } catch (error) {
       return res.json({
            'message' : error
        })
    }
}

module.exports = {getMenu,postMenu,deleteMenu,updateMenu};

