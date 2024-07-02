const form_login = document.querySelector('.form-login')

const mensaje_usuario = document.querySelector('.mensaje-usuario');        
const mensaje_password = document.querySelector('.mensaje-password');
const mensaje_valido = document.querySelector('.mensaje-valido'); 
const msje_error = document.querySelector('.msje-error'); 

form_login.addEventListener("submit", async (e) =>{
    e.preventDefault();    
    const erroresLogin = []    
    if((e.target.children.usuario.value.trim().length == 0)){
        erroresLogin.push({
            tipo:mensaje_usuario,
            msje:"nombre usuario no valido....",
        }) 
    }else{
        mensaje_usuario.classList.remove('msje-error');
        mensaje_usuario.textContent = "";
    }
    
    if((e.target.children.password.value.trim().length == 0)){
        erroresLogin.push({
            tipo:mensaje_password,
            msje:"formato password no valido....",
        })                
    }else{
        mensaje_password.classList.remove('msje-error')
        mensaje_password.textContent = "";
    }
    
    if (erroresLogin.length !== 0){
        mostrar_mensajes_error(erroresLogin)
    }else{
       obtenerAutenticacion(e)       
    }
})

async function obtenerAutenticacion(even){
    const usuario = even.target.children.usuario.value;
    const password = even.target.children.password.value;
    const datos = {usuario:usuario, password:password}
    const enviarJson = JSON.stringify(datos)
    const respuesta = await fetch('proyecto11-production-2c46.up.railway.app/api/user/login',{
        method: 'post',
        headers: {"Content-Type":"application/json"},
        body: enviarJson
    })

    if(!respuesta.ok) return msje_error.classList.toggle('autenticacion', false)
    const resJson = await respuesta.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
}

const mostrar_mensajes_error=(erroresLogin)=>{
    erroresLogin.forEach(items => {
        items.tipo.classList.add('msje-error');
        items.tipo.textContent = items.msje;
    });
}

