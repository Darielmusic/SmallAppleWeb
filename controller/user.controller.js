const models = require('../models/user.model')
const global = require('../models/global.modal')
const { connection } = require('../db/dbconnections')

module.exports = {

    getProduct: async function (req, res) {
        let pool = await connection;

        let resultado = await pool
            .request()
            .query(
                `select id, Nombre,Apellido,ltrim(rtrim(Cedula))Cedula, Direccion, email, usuario, codigo_user, tipo_user, contraseña, estatus from user`
            );
        // let dto = modelValidation(models.user, resultado.recordset);
        res.json(resultado.recordset);
    },

    getById: async function (req, res) {
        const { id } = req.params;
        let pool = await connection;
        let result = await pool.request()
            .query(`select id, Nombre,Apellido, Cedula, Direccion, email, usuario, codigo_user, tipo_user, contraseña, estatus from user where id = ${id}`)
        let respuesta = result.recordset.map((db) => {
            let dto = { ...models.product };
            dto.id = db.id
            dto.Nombre = db.Nombre
            dto.Apellido = db.Apellido
            dto.Cedula = db.Cedula
            dto.Direccion = db.Direccion
            dto.email = db.email
            dto.usuario = db.usuario
            dto.codigo_user = db.codigo_user
            dto.tipo_user = db.tipo_user
            dto.contraseña = db.contraseña
            dto.estatus = db.estatus

            return dto;
        });

        return res.json(respuesta);
    },

    postUser: async function (req, res) {
        try {
            const {
                Nombre, 
                Apellido, 
                Cedula,
                Direccion,
                email,
                usuario,
                codigo_user,
                tipo_user,
                contraseña,
                estatus,
            } = req.body

            let pool = await connection;
            let result = await pool
                .request()
                .input("Nombre", Nombre)
                .input("Apellido", Apellido)
                .input("Cedula", Cedula)
                .input("Direccion", Direccion)
                .input("email", email)
                .input("usuario", usuario)
                .input("codigo_user", codigo_user)
                .input("tipo_user", tipo_user)
                .input("contraseña", contraseña)
                .input("estatus", estatus)
                .execute("dbo.usp_crearUser")
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
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    },

    putUser: async function(req, res){
        const{
            Nombre, 
            Apellido, 
            Cedula,
            Direccion,
            email,
            usuario,
            codigo_user,
            tipo_user,
            contraseña,
            estatus,
        } = req.body;
        let pool = await connection;
        await pool 
        .request()
        .input("Nombre", Nombre)
        .input("Apellido", Apellido)
        .input("Cedula", Cedula)
        .input("Direccion", Direccion)
        .input("email", email)
        .input("usuario", usuario)
        .input("codigo_user", codigo_user)
        .input("tipo_user", tipo_user)
        .input("contraseña", contraseña)
        .input("estatus", estatus)
        .execute("dbo.updateUser")

        return res.status(204).end();
    }
}