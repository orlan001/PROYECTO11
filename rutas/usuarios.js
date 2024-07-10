const express = require('express')

const router = require('express').Router();

const cookieParser = require('cookie-parser')

router.use(cookieParser())

const path = require('path')


const autorizacionUsuarios = require('../autorizacion/usuarios')

const controladorUsuarios = require('../controlador/usuarios')

//const controladorServicios = require('../controlador/inicio')


const inicialDir = path.parse(__dirname)

router.use(express.static(path.join(inicialDir.dir, "/front/public/css")));

router.use(express.static(path.join(inicialDir.dir, "/front/public/img")));

router.use(express.static(path.join(inicialDir.dir, "/front/public/js")));


router.get("/",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/login.html")))

router.get("/registrar",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/registrar.html")))

router.get("/contact",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/contact.html")))

router.get("/about",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/about.html")))

router.get("/admin",autorizacionUsuarios.administrador, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/panel/usuario.html")))


//usuarios
router.post('/registrar', controladorUsuarios.crearUsuarios )

router.post('/login', controladorUsuarios.obtenerUsuarios)

router.put('/actualizar/:id', controladorUsuarios.actualizarUsuarios)

router.delete('/eliminar/:id', controladorUsuarios.eliminarUsuarios)

router.get('/listar', controladorUsuarios.listarUsuario)


module.exports = router
