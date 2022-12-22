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

const sectionVerMapa = document.querySelector("#ver-mapa");
const mapa = document.querySelector("#mapa");

//es el array donde se guardaran los objetos
var pipati = [];

var opcionDePipati;
var inputMessi;
var inputCristiano;
var inputNeymar;
var personajesJugador;
var miJugador;
var ataqueJugador;
var ataqueEnemigo;
var ataquesPipadi;
var botones = [];
var botonPiedra;
var botonPapel;
var botonTijera;
var lienzo = mapa.getContext("2d");
var intervalo;
var mapaBackground = new Image();
mapaBackground.src = "./assets/img/escenarioMapa.jpg";

var vidasJugador = 3;
var vidasEnemigo = 3;

//esto es una clase que en un ejemplo real vendria a hacer como animales
class Pipati {
  constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
    //propiedades
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.x = x;
    this.y = y;
    this.ancho = 70;
    this.alto = 70;
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadx = 0;
    this.velocidady = 0;
  }
  pintarJugador() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

//creando un objeto a partir de la clase creada, en un ejemplo real sera gato, perro, etc.
var messi = new Pipati(
  "Messi",
  "../src/assets/img/messims10.jpg",
  5,
  "../src/assets/img/messi.jpg"
);

var cristiano = new Pipati(
  "Cristiano",
  "../src/assets/img/cristianocr7.jpg",
  5,
  "../src/assets/img/cristiano.jpg"
);
var neymar = new Pipati(
  "Neymar",
  " ../src/assets/img/neymar.jpg",
  5,
  "../src/assets/img/ney.jpg"
);

var neymarEnemigo = new Pipati(
  "Neymar",
  " ../src/assets/img/neymar.jpg",
  5,
  "../src/assets/img/ney.jpg",
  420,
  110
);

var messiEnemigo = new Pipati(
  "Messi",
  "../src/assets/img/messims10.jpg",
  5,
  "../src/assets/img/messi.jpg",
  420,
  25
);

var cristianoEnemigo = new Pipati(
  "Cristiano",
  "../src/assets/img/cristianocr7.jpg",
  5,
  "../src/assets/img/cristiano.jpg",
  420,
  200
);

messi.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);
messiEnemigo.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);

cristiano.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);
cristianoEnemigo.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);

neymar.ataques.push(
  { nombre: "🥌", id: "boton-Piedra" },
  { nombre: "🧻", id: "boton-Papel" },
  { nombre: "✂", id: "boton-Tijera" }
);
neymarEnemigo.ataques.push(
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
    sectionVerMapa.style.display = "none";
    
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

        sectionVerMapa.style.display = "flex";

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
        iniciarMapa();
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
  botonPiedra = document.querySelector("#boton-Piedra");
  botonPapel = document.querySelector("#boton-Papel");
  botonTijera = document.querySelector("#boton-Tijera");

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

function seleccionarPersonajeEnemigo(enemigo) {
  //lo que hacemos con la propiedad length es que te bote el numero de elementos del arreglo y se le resta -1 porque el arreglo inicia en el indice 0
  //var PersonajeAleatorio = aleatorio(0, pipati.length - 1);
  //se tendra una sola fuente de verdad con esta logica
  //spanPersonajeEnemigo.innerHTML = pipati[PersonajeAleatorio].nombre;
  spanPersonajeEnemigo.innerHTML = enemigo.nombre;
  ataquesDelEnemigo = enemigo.ataques;
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  miJugador.x = miJugador.x + miJugador.velocidadx;
  miJugador.y = miJugador.y + miJugador.velocidady;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  miJugador.pintarJugador();
  messiEnemigo.pintarJugador();
  cristianoEnemigo.pintarJugador();
  neymarEnemigo.pintarJugador();
  if (miJugador.velocidadx !== 0 || miJugador.velocidady !== 0) {
    revisarColision(messiEnemigo);
    revisarColision(cristianoEnemigo);
    revisarColision(neymarEnemigo);
  }
}
function moverDerecha() {
  miJugador.velocidadx = 5;
  pintarCanvas();
}
function moverIzquierda() {
  miJugador.velocidadx = -5;
  pintarCanvas();
}
function moverAbajo() {
  miJugador.velocidady = 5;
  pintarCanvas();
}
function moverArriba() {
  miJugador.velocidady = -5;
  pintarCanvas();
}

function iniciarMapa() {
  mapa.width = 550;
  mapa.height = 300;
  miJugador = obtenerObjetoJugador();
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener(
    "keydown",
    (sePresionoUnaTecla = (event) => {
      switch (event.key) {
        case "ArrowUp":
          moverArriba();
          break;
        case "ArrowDown":
          moverAbajo();
          break;
        case "ArrowLeft":
          moverIzquierda();
          break;
        case "ArrowRight":
          moverDerecha();
          break;
        default:
          break;
      }
    })
  );
  window.addEventListener("keyup", detenerMovimiento);
}
function detenerMovimiento() {
  miJugador.velocidadx = 0;
  miJugador.velocidady = 0;
}

function obtenerObjetoJugador() {
  for (let i = 0; i < pipati.length; i++) {
    if (personajesJugador === pipati[i].nombre) {
      return pipati[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaJugador = miJugador.y;
  const abajoJugador = miJugador.y + miJugador.alto;
  const derechaJugador = miJugador.x + miJugador.ancho;
  const izquierdaJugador = miJugador.x;

  if (
    abajoJugador < arribaEnemigo ||
    arribaJugador > abajoEnemigo ||
    derechaJugador < izquierdaEnemigo ||
    izquierdaJugador > derechaEnemigo
  ) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarPersonajeEnemigo(enemigo);
}
