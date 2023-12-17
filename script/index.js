//Arrays para verficacion de lso numeros
let repetidos = [];
let numerosEncontradosJugador = [];
let numerosEncontradosCpu = [];
// variables para la identificacion de las clases de ccs
let etiquetaNumeroBola = document.querySelector("#boton");
let etiquetaTarjetaJugador = document.querySelector(".gridJugador");
let etiquetaTarjetaCpu = document.querySelector(".gridCpu");
let etiquetaNumerosSacados = document.querySelector(".gridSalidas");
let pulsaciones;

window.onload = function tabla() {
  //let etiqueta = document.querySelectorAll(".gridJugador")[0]; - esto es para elegir uno en concreto, usalo cuando haya varias clases que se llamen igual.

  for (let index = 0; index < 15; index++) {
    let nuevaEtiqueta = document.createElement("div");
    let generarNumeroAleatorio = Math.floor(Math.random() * 99) + 1;

    if (repetidos.includes(generarNumeroAleatorio)) {
      index--;
    } else {
      nuevaEtiqueta.className = "cuadroNumero";
      //nuevaEtiqueta.id = 'cuadroNumero' esta linea es por si quisieramos escribir en vez de un class un ID,
      nuevaEtiqueta.textContent = generarNumeroAleatorio;
      etiquetaTarjetaJugador.appendChild(nuevaEtiqueta);
      //nuevaEtiqueta.id = 'cuadroNumero' esta linea es por si quisieramos escribir en vez de un class un ID,
      repetidos.push(generarNumeroAleatorio);
    }
  }

  repetidos = [];
  for (let index = 0; index < 15; index++) {
    let nuevaEtiqueta = document.createElement("div");
    let generarNumeroAleatorio = Math.floor(Math.random() * 99) + 1;
    if (repetidos.includes(generarNumeroAleatorio)) {
      index--;
    } else {
      nuevaEtiqueta.className = "cuadroNumero";
      nuevaEtiqueta.textContent = generarNumeroAleatorio;
      etiquetaTarjetaCpu.appendChild(nuevaEtiqueta);
      repetidos.push(generarNumeroAleatorio);
    }

  }

  repetidos = [];
};



etiquetaNumeroBola.addEventListener("click", sacarBola);

function sacarBola() {
  let numeroAleatorio;
  pulsaciones = setInterval(() => {


    if (repetidos.length >= 99) {
      console.log("Fin del programa")
      etiquetaNumeroBola.textContent = "FIN DEL JUEGO";
    } else {

      do {
        console.log("estoy en bucle")
        numeroAleatorio = Math.floor(Math.random() * 99) + 1;
      } while (repetidos.includes(numeroAleatorio));

      etiquetaNumeroBola.textContent = numeroAleatorio;
      let nuevaEtiqueta = document.createElement("div");
      nuevaEtiqueta.textContent = numeroAleatorio;
      nuevaEtiqueta.className = "cuadroNumero";
      etiquetaNumerosSacados.appendChild(nuevaEtiqueta);
      repetidos.push(numeroAleatorio);
      comprobarNumero();
    }
  }, 100);
}

function elegirGanador() {

  let vectorEtiquetasJugador = document.querySelectorAll(".gridJugador > div");
  let vectorEtiquetasCpu = document.querySelectorAll(".gridCpu > div");

  let marcadosJugador = 0;
  let marcadosCpu = 0;

  for (let index = 0; index < vectorEtiquetasJugador.length; index++) {
    if (vectorEtiquetasJugador[index].classList.contains("numeroAparecido")) {
      marcadosJugador++;
    }

    if (vectorEtiquetasCpu[index].classList.contains("numeroAparecido")) {
      marcadosCpu++;
    }
  }

  if (marcadosJugador >= 15) {
    etiquetaNumeroBola.textContent = "GANA JUGADOR";
  } else if (marcadosCpu >= 15) {
    etiquetaNumeroBola.textContent = "GANA CPU";
  }
}

function cambiarCuadroNumero(numeroSacado, quienGano) {
  let vectorEtiquetasJugador = document.querySelectorAll(".gridJugador > div");
  let vectorEtiquetasCpu = document.querySelectorAll(".gridCpu > div");
  if (quienGano) {
    vectorEtiquetasJugador[numeroSacado].classList.add("numeroAparecido")
  } else {
    vectorEtiquetasCpu[numeroSacado].classList.add("numeroAparecido")
  }
}

function buscarNumero() {
  let vectorEtiquetasJugador = document.querySelectorAll(".gridJugador > div");
  let vectorEtiquetasCpu = document.querySelectorAll(".gridCpu > div");


  for (let index = 0; index < vectorEtiquetasJugador.length; index++) {
    let numeroJugador = parseInt(vectorEtiquetasJugador[index].textContent);
    let numeroCpu = parseInt(vectorEtiquetasCpu[index].textContent);

    if (
      repetidos.includes(numeroJugador) &&
      !numerosEncontradosJugador.includes(numeroJugador) &&
      repetidos.includes(numeroCpu) &&
      !numerosEncontradosCpu.includes(numeroCpu)
    ) {
      cambiarCuadroNumero(index, true);
      numerosEncontradosJugador.push(numeroJugador);
      cambiarCuadroNumero(index, false);
      numerosEncontradosCpu.push(numeroCpu);
    } else if (repetidos.includes(numeroJugador) && !numerosEncontradosJugador.includes(numeroJugador)) {

      console.log("Numero encontrado: " + numeroJugador + " de jugador");
      numerosEncontradosJugador.push(numeroJugador);
      cambiarCuadroNumero(index, true)
    } else if (repetidos.includes(numeroCpu) && !numerosEncontradosCpu.includes(numeroCpu)) {

      console.log("Numero encontrado: " + numeroCpu + " de cpu");
      numerosEncontradosCpu.push(numeroCpu);
      cambiarCuadroNumero(index, false)
    }

  }

}

function comprobarNumero() {
  buscarNumero()
  elegirGanador()
  if (etiquetaNumeroBola.textContent == "GANA JUGADOR" || etiquetaNumeroBola.textContent == "GANA CPU") {
    etiquetaNumeroBola.removeEventListener("click", sacarBola)
    clearInterval(pulsaciones)
  }
}