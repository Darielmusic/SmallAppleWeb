const models = require('../models/products.model')
const global = require('../models/global.modal')
const { connection } = require('../db/dbconnections')

module.exports = {

    getProduct: async function (req, res) {
        let pool = await connection;

        let resultado = await pool
            .request()
            .query(
                `select id, ltrim(rtrim(article))article,ltrim(rtrim(barcode))barcode,ltrim(rtrim(description))description, statusId, categoryId, price, cantidad from produts`
            );
        // let dto = modelValidation(models.product, resultado.recordset);
        res.json(resultado.recordset);
    },

    getById: async function (req, res) {
        const { id } = req.params;
        let pool = await connection;
        let result = await pool.request()
            .query(`select id,article, barcode, description, statusId, categoryId, price, cantidad from produts where id = ${id}`)
        let respuesta = result.recordset.map((db) => {
            let dto = { ...models.product };
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

    postProduct: async function (req, res) {
        try {
            const {
                article,
                barcode,
                description,
                statusId,
                categoryId,
                price,
                cantidad = 0,
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
                .input("cantidad", cantidad)
                .execute("dbo.usp_crearProductos")

            let respuesta = result.recordset.map((db) => {
                let dto = { ...global.modelReponse };
                dto.status = db.status
                dto.message = db.message
                return dto;
            })
          
            if (respuesta[0].status == 3) {
                return res.json(req.body);
            } else {
                console.log(respuesta);
                throw new Error(respuesta[0].message)
            }
           F
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    },

    putProduct: async function(req, res){
        const{
            article,
            barcode,
            description,
            statusId,
            categoryId,
            price,
            cantidad,
        } = req.body;
        let pool = await connection;
        await pool 
        .request()
        .input("id", req.params.id)
        .input("article", article)
        .input("barcode", barcode)
        .input("description", description)
        .input("statusId", statusId)
        .input("categoryId", categoryId)
        .input("price", price)
        .input("cantidad", cantidad)
        .execute("dbo.updateProduct")

        return res.status(204).end();
    },

    putProductCantidad: async function(req, res){
        const{
            cantidad,
        } = req.body;
        let pool = await connection;
        await pool 
        .request()
        .input("id", req.params.id)
        .input("cantidad", cantidad)
        .execute("dbo.updateProductCantidad")

        return res.status(204).end();
    }
}