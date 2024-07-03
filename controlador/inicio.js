const conexion = require('../db/dbConexion')

const obtenerServicios = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
    const result = await conectar.query('SELECT tbltiposervicio.nombreTipoServicio,tbltiposervicio.descripcionTipoServicio, tbltiposervicio.imgTipoServicio, tbltipovehiculo.nombreTipoVehiculo, tbltipovehiculoservicio.precioTipoVehiculoServicio, tbltiposervicio.idTipoServicio FROM ((tbltipovehiculoservicio INNER JOIN tbltiposervicio ON tbltipovehiculoservicio.idTipoServicio = tbltiposervicio.idTipoServicio INNER JOIN tbltipovehiculo ON tbltipovehiculoservicio.idTipoVehiculo = tbltipovehiculo.idTipoVehiculo )) ORDER BY tbltipovehiculoservicio.idTipoServicio', async (error, results)=>{
         if(error) throw res.status(400).send({status:error, message:'error al obtener datos'})
            //res.send({status:"ok", message: "data",})// redirect:"/api/user/inicio"
         const data = results;
         return res.send(data)
    })
}

module.exports = {
    obtenerServicios
}
