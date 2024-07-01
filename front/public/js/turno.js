const formTurno = document.getElementById('form-turno')

//tipoVehiculo y servicios
var tipoVehiculo = document.getElementById('tipo-vehiculo')
const patente = document.getElementById('patente')
const descripcion = document.getElementById('descripcion');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora')

//Datos Personales
const dni = document.getElementById('dni');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');

//para mostrar mensajes de error
const mensaje_valido = document.querySelector('.mensaje-valido'); 
const mensaje_dni = document.querySelector('.mensaje-dni');
const mensaje_email = document.querySelector('.mensaje-email');
const mensaje_fecha = document.querySelector('.mensaje-fecha');
const mensaje_hora = document.querySelector('.mensaje-hora');


document.addEventListener("DOMContentLoaded", (event) => {
    cargarTipoVehiculo();
});

//expresion regular para validar email
const expRegValidarEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

formTurno.addEventListener('submit', e =>{
    e.preventDefault()

    const errores = []

    if(dni.value.length == 0){
        errores.push({
            tipo:mensaje_dni,
            msje:"formato dni no valido..",            
        })        

    }else{
        mensaje_dni.textContent = "";
        mensaje_dni.classList.remove('msje-error');
    }

    if(!expRegValidarEmail.test(email.value)){
        errores.push({
            tipo:mensaje_email,
            msje:"formato email no valido..",            
        })        

    }else{
        mensaje_email.textContent = "";
        mensaje_email.classList.remove('msje-error');
    }

    if(fecha.value.length == 0 ){
        errores.push({
            tipo:mensaje_fecha,
            msje:"formato fecha no valido..",            
        })        
    }else{
        mensaje_fecha.textContent = "";
        mensaje_fecha.classList.remove('msje-error');
    }

    if(hora.value.length == 0 ){
        errores.push({
            tipo:mensaje_hora,
            msje:"formato hora no valido..",            
        })        
    }else{
        mensaje_hora.textContent = "";
        mensaje_hora.classList.remove('msje-error');
    }

    if (errores.length !== 0){
            mostrar_mensajes_error(errores)
    }else{
            mostrar_mensaje_form_enviado();
            console.log(datosFormReservaTurno);
            localStorage.setItem("datosReserva", JSON.stringify(datosFormReservaTurno));
    }
})

const mostrar_mensaje_form_enviado =()=>{
    mensaje_valido.classList.add('msje-val');
    mensaje_valido.textContent = "formulario enviado con exito.."
    setTimeout(valido, 1000);
}

function valido(){
    mensaje_valido.classList.remove('msje-val')
    mensaje_valido.textContent="";
};

const mostrar_mensajes_error=(errores)=>{
    errores.forEach(items => {
        items.tipo.classList.add('msje-error');
        items.tipo.textContent = items.msje;
    });
}

const cargarTipoVehiculo = ()=>{
    tblTipoVehiculo.forEach(items =>{
        var opciones = document.createElement('option');
        opciones.textContent = items.tipoVehiculoDescripcion;
        opciones.setAttribute('value', items.idTipoVehiculo);
        tipoVehiculo.appendChild(opciones);
    })
}

 
const listaTabla = document.querySelector('.listaTabla');
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();

tipoVehiculo.addEventListener('change', ()=>{
    let selecionOpcion = tipoVehiculo.options[tipoVehiculo.selectedIndex].value
    while(listaTabla.firstChild){
        listaTabla.removeChild(listaTabla.firstChild);
    }
    mostrarDatosTablaServicioPrecio(selecionOpcion);   
})

const mostrarDatosTablaServicioPrecio = (e)=>{
    //insertar datos en la tabla al seleccionar tipo de vehiculo
    tblTipoVehiculoServicio.forEach((items) =>{
        if(items.idTipoVehiculo === parseInt(e)){    
            template.querySelector('#tdidTipoVehiculoServicio').textContent = items.idTipoServicio;
            const {tipoServicioDescripcion} = tblTipoServicio.find(elemento => parseInt(elemento.idTipoServicio) === parseInt(items.idTipoServicio))
            template.querySelector('#tdidTipoServicio').textContent = tipoServicioDescripcion;
            template.querySelector('#tdPrecio').textContent = items.precio;
            template.querySelector('.tipo-servicio').setAttribute('value',parseInt(items.idTipoServicio));
            const clone = template.cloneNode(true);    
            fragment.appendChild(clone);
        }
    })
    listaTabla.appendChild(fragment)
}

const idTiposServicios=[];
listaTabla.addEventListener('change', (e)=>{
        let valorBuscado = idTiposServicios.includes(e.target.value)
        if(e.target.checked && !valorBuscado){
            idTiposServicios.push(e.target.value)
        }else{
            if(valorBuscado){
                const index = idTiposServicios.findIndex((ind) => ind === e.target.value);
                delete(idTiposServicios[index]);
            }
        }
})

