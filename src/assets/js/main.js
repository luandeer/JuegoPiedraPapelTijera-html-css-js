const sectionSeleccionarAtaque = document.querySelector("#seleccionar-ataque");
const sectionReiniciar = document.querySelector("#reiniciar");
const botonPersonajeJugador = document.querySelector("#boton-jugador");

const sectionSeleccionarPersonaje = document.querySelector(
  "#seleccionar-jugador"
);

const spanPersonajeJugador = document.querySelector("#Personaje-jugador");

const spanPersonajeEnemigo = document.querySelector("#Personaje-enemigo");

const spanVidasJugador = document.querySelector("#vidas-jugador");
const spanVidasEnemigo = document.querySelector("#vidas-enemigo");
const botonReiniciar = document.querySelector("#boton-reiniciar");

const sectionMensajes = document.querySelector("#resultado");
const ataquesDelJugador = document.querySelector("#ataques-del-jugador");
const ataquesDelEnemigo = document.querySelector("#ataques-del-enemigo");

const contenedorTarjetas = document.querySelector("#contenedorTarjetas");
const contenedorAtaques = document.querySelector("#contenedorAtaques");
//es el array donde se guardaran los objetos
var pipati = [];

var opcionDePipati;
var inputMessi;
var inputCristiano;
var inputNeymar;
var personajesJugador;
var ataqueJugador;
var ataqueEnemigo;
var ataquesPipadi;
var botones =[];
var botonPiedra;
var botonPapel;
var botonTijera;



var vidasJugador = 3;
var vidasEnemigo = 3;

//esto es una clase que en un ejemplo real vendria a hacer como animales
class Pipati {
  constructor(nombre, foto, vida) {
    //propiedades
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}
//creando un objeto a partir de la clase creada, en un ejemplo real sera gato, perro, etc.
var messi = new Pipati("Messi", "../src/assets/img/messims10.jpg", 5);

var cristiano = new Pipati(
  "Cristiano",
  "../src/assets/img/cristianocr7.jpg",
  5
);

var neymar = new Pipati("Neymar", " ../src/assets/img/neymar.jpg", 5);

messi.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);

cristiano.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);
neymar.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);

pipati.push(messi, cristiano, neymar);

//este evento es para que cargue toda el html cuando se inicia el juego, de esta manera podemos poner el script de html en el head y ya no en el body(al último)
window.addEventListener(
  "load",
  (iniciarJuego = () => {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

    //forEach por cada elemento se ejecuta una funcion en un array
    pipati.forEach((Pipati) => {
      //inserta parte del codigo de los personajes que aparecen en html
      opcionDePipati = `
      <input type="radio" name="jugadores" id=${Pipati.nombre} />
      <label class="tarjeta-de-pipati" for=${Pipati.nombre}>
        <p>${Pipati.nombre}</p>
        <img src=${Pipati.foto} alt=${Pipati.nombre} />
      </label>`;

      //guarda el codigo de opcionDePipati
      contenedorTarjetas.innerHTML += opcionDePipati;
      inputMessi = document.querySelector("#Messi");
      inputCristiano = document.querySelector("#Cristiano");
      inputNeymar = document.querySelector("#Neymar");
    });

    //agregando un evento click mediante addEventListener
    botonPersonajeJugador.addEventListener(
      "click",
      (seleccionarPersonajeJugador = () => {
        sectionSeleccionarPersonaje.style.display = "none";
        sectionSeleccionarAtaque.style.display = "flex";
        //checked(booleean) es para verificar si el usuario elegió correctamente.
        //inner.HTML va modificar el contenido de la etiqueta <span></span> en nuestro archivo html
        if (inputMessi.checked) {
          spanPersonajeJugador.innerHTML = inputMessi.id;
          personajesJugador = inputMessi.id;
        } else {
          if (inputCristiano.checked) {
            spanPersonajeJugador.innerHTML = inputCristiano.id;
            personajesJugador = inputCristiano.id;
          } else {
            if (inputNeymar.checked) {
              spanPersonajeJugador.innerHTML = inputNeymar.id;
              personajesJugador = inputNeymar.id;
            } else {
              alert("Tienes que seleccionar un jugador.");
            }
          }
        }
        extraerAtaques(personajesJugador);
        seleccionarPersonajeEnemigo();
      })
    );

    

    botonReiniciar.addEventListener(
      "click",
      (reiniciarJuego = () => {
        location.reload();
      })
    );
  })
);

function extraerAtaques(personajesJugador) {
  var ataques;
  for (let i = 0; i < pipati.length; i++) {
    if (personajesJugador === pipati[i].nombre) {
      ataques = pipati[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesPipadi = ` 
    <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesPipadi;
  });
  botonPiedra = document.querySelector('#boton-Piedra');
  botonPapel = document.querySelector('#boton-Papel');
  botonTijera = document.querySelector('#boton-Tijera');

  




  botonPiedra.addEventListener(
    "click",
    (ataquePiedra = () => {
      ataqueJugador = "Piedra";
      ataqueAleatorioEnemigo();
    })
  );

  botonPapel.addEventListener(
    "click",
    (ataquePapel = () => {
      ataqueJugador = "Papel";
      ataqueAleatorioEnemigo();
    })
  );

  botonTijera.addEventListener(
    "click",
    (ataqueTijera = () => {
      ataqueJugador = "Tijera";
      ataqueAleatorioEnemigo();
    })
  );
}
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Piedra";
  } else {
    if (ataqueAleatorio == 2) {
      ataqueEnemigo = "Papel";
    } else {
      ataqueEnemigo = "Tijera";
    }
  }
  combate();
}

function combate() {
  if (ataqueEnemigo == ataqueJugador) {
    crearMensajes("EMPATE");
  } else if (ataqueJugador == "Piedra" && ataqueEnemigo == "Tijera") {
    crearMensajes("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "Papel" && ataqueEnemigo == "Piedra") {
    crearMensajes("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "Tijera" && ataqueEnemigo == "Papel") {
    crearMensajes("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensajes("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Felicitaciones! Ganaste 🏆🏆");
  } else {
    if (vidasJugador == 0) {
      crearMensajeFinal("Lo siento! Perdiste");
    }
  }
}

function crearMensajes(resultado) {
  //se crea una etiqueta parrafo
  var nuevoAtaqueDelJugador = document.createElement("p");
  var nuevoAtaqueDelEnemigo = document.createElement("p");

  //asignas un valor a las variables creadas en js
  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  //para agregar el parrafo que creamos en nuevo ataquesDelJugador y ataquesDelEnemigo
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonPiedra.disabled = true;
  botonPapel.disabled = true;
  botonTijera.disabled = true;
  sectionReiniciar.style.display = "block";
}



function seleccionarPersonajeEnemigo() {
  //lo que hacemos con la propiedad length es que te bote el numero de elementos del arreglo y se le resta -1 porque el arreglo inicia en el indice 0
  var PersonajeAleatorio = aleatorio(0, pipati.length - 1);
  //se tendra una sola fuente de verdad con esta logica
  spanPersonajeEnemigo.innerHTML = pipati[PersonajeAleatorio].nombre;
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
