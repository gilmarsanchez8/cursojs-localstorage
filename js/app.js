//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
//Event listeners
eventListeners();
function eventListeners(){
    //Cuando agrega un tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}

//Funciones
function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribió
    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError("No se permiten tweets vacíos");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    //Crear el HTML para el listado de tweets
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout( () => {
        mensajeError.remove();
    }, 3000)
}

//Mostrar el listado de tweets
function crearHTML(){

    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar el botón
            li.appendChild(btnEliminar);

            //insertarlo en el HTML
            listaTweets.appendChild(li);
        }) 
    }

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}

//limpiar el html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}