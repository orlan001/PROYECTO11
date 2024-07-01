const modalCentro = document.querySelector("#modal-centro");
const cerrarModalCentro = document.querySelector("#cerrar-modal-centro");

const form_actualizar = document.querySelector('.form-actualizar')

const contenedor_tabla_usuario = document.querySelector('.contenedor-tabla-usuario')
const template_usuario = document.querySelector('.template-usuario')
const fragment = document.createDocumentFragment()

let cont=0;

//cargar en el DOM despues cargar tdo html en la pagina
document.addEventListener('DOMContentLoaded',()=>{
    obtenerDatos()
})

//cerrar la ventana modal con el boton cerrar
cerrarModalCentro.addEventListener("click", () => {
    modalCentro.classList.remove("active");
    window.location.reload();
})

//obtener datos para listar los datos del usuario
const obtenerDatos = async ()=>{
    try {
        const respuesta = await fetch('http://localhost:4000/api/user/listar', {
            method: 'get',
            headers: { "Content-Type": "application/json"}
        })
        if(!respuesta.ok) return console.log("datos del usuario no encontrado..")
        const resJson = await respuesta.json()
        if(resJson.redirect){window.location.href = resJson.redirect}
        mostrarDatos(resJson);
    } catch (error) {
        console.log(error)
    }
}

//mostrar los datos en la despues de habar traido de la base de datos
const mostrarDatos = (datos)=>{
        Object.values(datos).forEach(element => {
                const clone = template_usuario.content.firstElementChild.cloneNode(true) 
                clone.querySelector('#id').textContent = element.idUsuario
                clone.querySelector('#nombre').textContent = element.nombreUsuario
                clone.querySelector('#email').textContent = element.emailUsuario
//              clone.querySelector('.password').textContent = element.passwordUsuario
                clone.addEventListener('click', (idUser));
                fragment.appendChild(clone)
        })
        contenedor_tabla_usuario.appendChild(fragment)       
}

//evento click clonado con el template
const idUser = (e)=>{
    e.preventDefault()
    if(e.target.matches(".btnactualizar")){       
        modalCentro.classList.add("active");
        let datas = e.target.parentElement.parentElement.children;
        cargarDataId(datas) //cargar datos al formulario para modificar        
        
    }
    
    if(e.target.matches(".btneliminar")){
        let data = e.target.parentElement.parentElement.children[0].textContent;
        eliminarDataId(data) //captura el id de la tabla para eliiminar
    }
}

//cargar datos en el formulario actualizar
const cargarDataId = (datas)=>{
    const inputs = document.querySelectorAll('input')
    for(let index of inputs){
        index.value = datas[cont].textContent
        console.log(index)
        cont++;
    }
}

//enviar el id para eliminar al usuario 
const eliminarDataId = async (id)=>{
    try {
        const respuesta = await fetch(`http://localhost:4000/api/user/eliminar/${id}`, {
            method: 'DELETE',
        })
        if(!respuesta.ok) return console.log("datos del usuario no encontrado..")
        const resJson = await respuesta.json()
        if(resJson.redirect){window.location.href = resJson.redirect}
    } catch (error) {
        console.log(error)
    }
}

//enviar los datos del form para actualizar
form_actualizar.addEventListener("submit", async(e)=>{
    try {
        const id = e.target.children.id.value;
        const usuario = e.target.children.usuario.value;
        const email = e.target.children.email.value;
        let enviar = {usuario: usuario, email:email, id:id}
        let enviarJson = JSON.stringify(enviar)
        console.log(enviar)
        const respuesta = await fetch(`http://localhost:4000/api/user/actualizar/${id}`, {
            method: 'PUT',
            headers:{"Content-Type": "application/json"},
            body: enviarJson
        })

        if(!respuesta.ok) return console.log("datos del usuario no encontrado..")
        const resJson = await respuesta.json()
        if(resJson.redirect){window.location.href = resJson.redirect}
    } catch (error) {
        console.log(error)
    }
})