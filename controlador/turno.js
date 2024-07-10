const conexion = require('../db/dbConexion')

const obtenerTipoVehiculo = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
    const result = await conectar.query('SELECT * FROM tbltipovehiculo', async (error, results)=>{
         if(error) throw res.status(400).send({status:error, message:'error al obtener datos'})
         const data = results;
         return res.send(data)
    })
}

module.exports = {
    obtenerTipoVehiculo
}

