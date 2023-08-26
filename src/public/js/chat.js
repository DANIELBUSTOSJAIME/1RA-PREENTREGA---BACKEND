/*const socket = io()

socket.emit('mensajeConexion', "Hola Socket")

const botonChat = document.getElementById('botonChat')
const valInput = document.getElementById('chatBox')
const parrafosMensajes = document.getElementById('parrafosMensajes')

let user

Swal.fire({
    title: "Identificación de usuario",
    text: "Ingrese su usuario",
    input: "text",
    inputValidetor: (valor => {
        return !valor &&  "Ingrese su usuario valido"
    }),
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

botonChat.addEventListener('click', () => {
    let fechaActual = new Date().toLocaleString()
    if(valInput.value.trim().length > 0){
        socket.emit('mensaje', {fecha: fechaActual, user: user, mensaje: valInput.value})
        valInput.value = ""
    }
})

socket.on('mensajes', (arrayMensajes) => {
    parrafosMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>Fecha: ${mensaje.fecha}, User: ${mensaje.user}, Escribio: ${mensaje.mensaje} </p>`
    })
})*/