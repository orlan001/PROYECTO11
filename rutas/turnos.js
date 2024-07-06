const express = require('express')

const routerTurno = require('express').Router();

const path = require('path')

const autorizacionUsuarios = require('../autorizacion/usuarios') //se agrego

const controladorTurno = require('../controlador/turno')

const inicialDir = path.parse(__dirname)

routerTurno.use(express.static(path.join(inicialDir.dir, "/front/public/css")));

routerTurno.use(express.static(path.join(inicialDir.dir, "/front/public/img")));

routerTurno.use(express.static(path.join(inicialDir.dir, "/front/public/js")));


routerTurno.get("/turno",autorizacionUsuarios.publico, (req, res)=>res.sendFile(path.join(inicialDir.dir , "/front/views/turno.html")))

//turnos
routerTurno.get('/Vehiculos', controladorTurno.obtenerTipoVehiculo )

module.exports = routerTurno
