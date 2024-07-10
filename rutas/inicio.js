const express = require('express')

const routerInicio = require('express').Router();

const path = require('path')

const autorizacionUsuarios = require('../autorizacion/usuarios') //se agrego

const controladorInicio = require('../controlador/inicio')

const inicialDir = path.parse(__dirname)

routerInicio.use(express.static(path.join(inicialDir.dir, "/front/public/css")));

routerInicio.use(express.static(path.join(inicialDir.dir, "/front/public/img")));

routerInicio.use(express.static(path.join(inicialDir.dir, "/front/public/js")));


routerInicio.get("/inicio",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/index.html")))

//inicio
routerInicio.get('/servicio',controladorInicio.obtenerServicios)


module.exports = routerInicio
