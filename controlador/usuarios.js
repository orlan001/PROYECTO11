const bcrypt = require('bcryptjs')
const conexion = require('../db/dbConexion')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const datosUsuarios = [];

const crearUsuarios = async (req, res) =>{
    const conectar = await conexion.obtenerConexion();
    let password = req.body.password;
    let salt = await bcrypt.genSalt(5);
    let hasPass = await bcrypt.hash(password, salt)
    let datos = {nombreUsuario:req.body.usuario, emailUsuario:req.body.email, passwordUsuario:hasPass, rolUsuario:''}
    const result = await conectar.query('INSERT INTO tblusuarios SET ?', datos, (error, results)=>{
        if(error) throw res.status(400).send({status:error, message:'error al registrar datos'})
        return res.status(201).send({status:"ok", message:"usuario agregado en db.", redirect:"/api/user/" })
    })
}

const obtenerUsuarios = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
    const usuario = req.body.usuario;
    const password = req.body.password
    if(usuario && password){
        const result = await conectar.query('SELECT * FROM tblusuarios WHERE nombreUsuario =?', [usuario], async (error, results)=>{
            if(error) throw res.status(400).send({status:error, message:'error al obtener datos'})
            if(results.length == 0 || !(await bcrypt.compare(password, results[0].passwordUsuario))){
                console.log('usuario o password invalido..')
                return res.status(400).send({status:"error", message: "error de autenticacion..."})
            }else{
                console.log('login correcto...') 
                const  usuarioToken = {idUsuario:results[0].idUsuario,nombreUsuario:results[0].nombreUsuario
                }
                const token = jwt.sign(usuarioToken, process.env.TOKEN_SECRET, {expiresIn:process.env.JWT_EXP})
                const cookieExp = {expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60* 60* 1000), path:"/"}
                res.cookie("jwt",token,cookieExp)
                const user = datosUsuarios.push(usuarioToken)
                res.send({status:"ok", message: "usuario autorizado"})//, redirect:"/api/user/admin"})
                datosUsuarios.push(usuarioToken);
            }
        })
    }
}

const actualizarUsuarios = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
    const {id} = req.params
    const {usuario, email} = req.body
    console.log(usuario,"...", email)
    const sql = 'UPDATE tblusuarios SET nombreUsuario = ?, emailUsuario = ? WHERE idUsuario = ?';
    await conectar.query(sql, [usuario, email, id], (error, result)=>{
        console.log(result, "result")
        if(error) return res.status(500).send(error);
        res.send({status:"ok", message: `Registro actualizado en bd. id:${id}`})//, redirect:"/api/user/admin"
    })
}

const eliminarUsuarios = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
    const {id} = req.params
    const sql = 'DELETE FROM tblusuarios WHERE idUsuario = ?';
    await conectar.query(sql, [id], (error, result)=>{
        if(error) return res.status(500).send(error);
        res.send({status:"ok", message: `Registro eliminado en bd. con id:${id}`, redirect:"/api/user/admin"})
    })
}

const listarUsuario = async (req, res)=>{
    const conectar = await conexion.obtenerConexion();
        const result = await conectar.query('SELECT * FROM tblusuarios', async (error, results)=>{
            if(error) throw res.status(400).send({status:error, message:'error al obtener datos'})
                const data = results
                res.send(data)
        })
}

module.exports = {
    crearUsuarios,
    obtenerUsuarios,
    actualizarUsuarios,
    eliminarUsuarios,
    datosUsuarios,
    listarUsuario
}
