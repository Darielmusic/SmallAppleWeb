const models = require('../models/category.model');
const {connection} = require('../db/dbconnections')
const global = require('../models/global.modal');


module.exports = {
    getCategry: async function(req, res){
        let pool =  await connection;
        let resultado = await pool.request()
        .query('select *from category');
        res.json(resultado.recordset)
    },

    byIdCategory: async function(req, res){
        const {id} = req.params;
        let pool = await connection;
        let result = await pool.request()
        .query(`select *from category where categoryId = ${id}`);
        let respuesta = result.recordset.map((db)=>{
            let dto = {...models.category};
            dto.categoryId = db.categoryId
            dto.description = db.description

            return dto;
        })
        return res.json(respuesta);
    },

    postCategory: async function(req, res){
        try {
            const {description} = req.body
            let pool = await connection;
            let result = await pool
            .request()
            .input("description", description)
            .execute('dbo.usp_createCategory')

            let respuesta = result.recordset.map((db)=>{
                let dto = {...global.modelReponse};
                dto.status = db.status
                dto.message = db.message
                return dto;
            })

            if(respuesta[0].status == 3){
                return res.json(req.body);
            }else{
                console.log(respuesta);
                throw new Error(respuesta[0].message)
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    },

    putCategory: async function(req, res){
        const {description} = req.body;
        let pool = await connection;
        await pool.request()
        .input("categoryId", req.params.id)
        .input("description", description)
        .execute("dbo.updateCategory")
        return res.json(204).end();
    }
}