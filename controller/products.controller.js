const models = require('../models/products.model')
const { connection } = require('../db/dbconnections')

module.exports = {

    getProduct: async function(req, res){
        let pool = await connection;

        let resultado = await pool
        .request()
        .query(
            `select id, ltrim(rtrim(article))article,ltrim(rtrim(barcode))barcode,ltrim(rtrim(description))description, statusId, categoryId, price from produts`
        );
        // let dto = modelValidation(models.product, resultado.recordset);
        res.json(resultado.recordset);
    },

    getById: async function(req, res){
        const {id} = req.params;
        let pool = await connection;
        let result = await pool.request()
        .query(`select id,ltrim(rtrim(article)) article, ltrim(rtrim(barcode)) barcode, ltrim(rtrim(description))description, statusId, categoryId, price from produts where id = ${id}`)
        let respuesta = result.recordset.map((db)=>{
            let dto = {...models.product};
            dto.id = db.id
            dto.article = db.article
            dto.barcode = db.barcode
            dto.description = db.description
            dto.statusId = db.statusId
            dto.categoryId = db.categoryId
            dto.price = db.price

            return dto;
        });

        return res.json(respuesta);
    },

    postProduct: async function(req, res){
        try {
            const {
                article,
                barcode,
                description,
                statusId,
                categoryId,
                price,
            } = req.body

            let pool = await connection;

            let result = await pool
            .request()
            .input("article", article)
            .input("barcode", barcode)
            .input("description", description)
            .input("statusId", statusId)
            .input("categoryId", categoryId)
            .input("price", price)
            .execute("usp_crearProductos")

           return res.json(result.recordset);
        } catch (error) {
            
        }
    }
}