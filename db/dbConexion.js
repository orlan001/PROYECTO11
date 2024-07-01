const mysql = require('promise-mysql')
const dotevn = require('dotenv')
dotevn.config();


const conexion = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD    
})

const obtenerConexion = async ()=>await conexion;

module.exports = {
    obtenerConexion,
}

