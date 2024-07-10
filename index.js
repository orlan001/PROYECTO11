const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv')
dotenv.config();

const usuariosRutas = require('./rutas/usuarios')

const turnoRutas = require('./rutas/turnos')

const inicioRutas = require('./rutas/inicio')

//servidor
const app = express();
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log('servidor iniciado en local host:', PORT)
})

//configuraciones
app.use(cookieParser());
app.use(cors({origin:true}))
app.use(express.urlencoded({extended:true}))
app.use(express.json({type:'*/*'}))

app.use(express.static(__dirname + "/front/public"));

app.use('/', usuariosRutas)

app.use('/', turnoRutas)

app.use('/', inicioRutas)
