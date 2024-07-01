const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
const conexion = require('../db/dbConexion')
const { datosUsuarios } = require('../controlador/usuarios')

dotenv.config()

const administrador = async (req, res, next) =>{
    const loginAutorizado = verificarCookie(req)
    if(loginAutorizado) return next()
    return res.redirect("/api/user/")
}

const publico = async (req, res, next) =>{
    const loginAutorizado = verificarCookie(req)
    if(!loginAutorizado) return next();
    return res.redirect("/api/user/admin")
}

function verificarCookie(req){
    try {
        const vcJwt=  req.headers.cookie.split(";").find(cookie => cookie.startsWith('jwt=')).slice(4);
        const dtVerificar = jsonwebtoken.verify(vcJwt, process.env.TOKEN_SECRET)        
        const vUsuario = datosUsuarios.find(usuario => usuario.nombreUsuario === dtVerificar.nombreUsuario)
        if(vUsuario){
            return true;
        }else{
            return false;
        }         
    } catch (error) {
        console.log(error)        
        return false
    }
}

module.exports = {
    administrador,
    publico
}