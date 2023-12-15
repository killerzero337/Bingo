let repetidos = [];
let numerosEncontrados = [];
let contadorGanador
let etiquetaNumeroBola = document.querySelector("#boton p");
let etiquetaTarjetaJugador = document.querySelector(".gridJugador");
let etiquetaTarjetaCpu = document.querySelector(".gridCpu");
let etiquetaNumerosSacados = document.querySelector(".gridSalidas");


window.onload = function tabla() {
  //let etiqueta = document.querySelectorAll(".gridJugador")[0]; - esto es para elegir uno en concreto, usalo cuando haya varias clases que se llamen igual.

  for (let index = 0; index < 15; index++) {
    let nuevaEtiqueta = document.createElement("div");
    let generarNumeroAleatorio = Math.floor(Math.random() * 90) + 1;

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
      //nuevaEtiqueta.id = 'cuadroNumero' esta linea es por si quisieramos escribir en vez de un class un ID,
      nuevaEtiqueta.textContent = generarNumeroAleatorio;
      etiquetaTarjetaCpu.appendChild(nuevaEtiqueta);
      //nuevaEtiqueta.id = 'cuadroNumero' esta linea es por si quisieramos escribir en vez de un class un ID,
      repetidos.push(generarNumeroAleatorio);
    }

  }

  repetidos = [];
};



etiquetaNumeroBola.addEventListener("click", sacarBola);
function sacarBola() {
  let numeroAleatorio = Math.floor(Math.random() * 90) + 1;
  if (repetidos.includes(numeroAleatorio)) {
    console.log("numero repetido " + numeroAleatorio)
  } else {
    etiquetaNumeroBola.textContent = numeroAleatorio;
    let nuevaEtiqueta = document.createElement("div");
    nuevaEtiqueta.textContent = numeroAleatorio;
    nuevaEtiqueta.className = "cuadroNumero";
    etiquetaNumerosSacados.appendChild(nuevaEtiqueta);
    repetidos.push(numeroAleatorio);
    comprobarNumero();
  }
}

function comprobarNumero() {
  let vectorEtiquetasJugador = document.querySelectorAll(".gridJugador > div");
  let vectorEtiquetasCpu = document.querySelectorAll(".gridCpu > div");
  for (let index = 0; index < vectorEtiquetasJugador.length; index++) {
    let numeroJugador = parseInt(vectorEtiquetasJugador[index].textContent);

    if (repetidos.includes(numeroJugador) && !numerosEncontrados.includes(numeroJugador)) {
      console.log("Numero encontrado: " + numeroJugador);
      numerosEncontrados.push(numeroJugador);
    }
  }
}