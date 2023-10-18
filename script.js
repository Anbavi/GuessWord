window.addEventListener("load", function () {
  console.log("La página ha terminado de cargarse!!");
});

// Contantes que devuelven el primer elemento que coincide con el grupo especificado
const letras = document.querySelector(".letras"),
  resetBtn = document.querySelector(".boton"),
  pista = document.querySelector(".pista"),
  posibilRestantes = document.querySelector(".posibilidades span"),
  letraEquivocada = document.querySelector(".letrasErroneas span"),
  letraInput = document.querySelector(".letra-input");

// Variables de alcance limitado a un bloque
let palabra,
  maxSuposiciones,
  letrasCorrectas = [],
  letrasIncorrectas = [];

// Selección aleatoria de la palabra a adivinar
function palabraAleatoria() {
  // Definimos para conseguir un item aleatorio
  let itemAleatorio = listado[Math.floor(Math.random() * listado.length)];

  palabra = itemAleatorio.palabra;
  maxSuposiciones = palabra.length >= 5 ? 8 : 6;
  letrasCorrectas = [];
  letrasIncorrectas = [];
  pista.innerText = itemAleatorio.pista;
  posibilRestantes.innerText = maxSuposiciones;
  letraEquivocada.innerText = letrasIncorrectas;

  // Cuadrados para escribir el texto
  let html = "";
  for (let i = 0; i < palabra.length; i++) {
    html += `<input type="text" disabled>`;
    letras.innerHTML = html;
  }
}
palabraAleatoria();

// Inicio del juego

function initGame(e) {
  //convertimos a minúsculas el valor
  let key = e.target.value.toLowerCase();
  // Hacemos que se escriban solo letras y comparamos si son correctas o incorrectas
  if (
    key.match(/^[A-Za-z]+$/) &&
    !letrasIncorrectas.includes(` ${key}`) &&
    !letrasCorrectas.includes(key)
  ) {
    // Letras correctas
    if (palabra.includes(key)) {
      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] == key) {
          letrasCorrectas += key;
          letras.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      // Letras incorrectas
      maxSuposiciones--;
      letrasIncorrectas.push(` ${key}`);
    }
    posibilRestantes.innerText = maxSuposiciones;
    letraEquivocada.innerText = letrasIncorrectas;
  }
  letraInput.value = "";

  // Resultados posibles

  setTimeout(() => {
    if (letrasCorrectas.length === palabra.length) {
      //Generamos una respuesta aleatoria para el ganador
      Swal.fire('"Enhorabuena! Has adivinado la palabra "'+palabra);
      /*  var meng = Math.floor(Math.random() * 5);
      if (meng == 0) {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      } else if (meng == 1) {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      } else if (meng == 2) {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      } else if (meng == 3) {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      } else if (meng == 4) {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      } else {
        alert(`Enhorabuena! Has adivinado la palabra ${palabra.toUpperCase()}`);
      }*/
      // Volvemos a seleccionar una palabra de la lista
      return palabraAleatoria();
    } else if (maxSuposiciones < 1) {
        
      Swal.fire('Has fallado!! Vuelve a intentarlo y lee la pista atentamente');
    /*  var menp = Math.floor(Math.random() * 5);
      if (menp == 0) {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      } else if (menp == 1) {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      } else if (menp == 2) {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      } else if (menp == 3) {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      } else if (menp == 4) {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      } else {
        alert("Has fallado!! Vuelve a intentarlo y lee la pista atentamente");
      }
      */

      for (let i = 0; i < palabra.length; i++) {
        // Mostramos la palabra oculta
        letras.querySelectorAll("input")[i].value = palabra[i];
      }
    }
  }, 100);
}

// Llamadas

letraInput.addEventListener("input", initGame);
letras.addEventListener("click", () => letraInput.focus());
document.addEventListener("keydown", () => letraInput.focus());
resetBtn.addEventListener("click", palabraAleatoria);
