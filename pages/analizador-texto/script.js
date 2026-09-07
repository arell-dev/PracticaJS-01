function analizarTexto() {
  let texto = document.getElementById("texto").value;

  if (texto.trim() === "") {
    alert("Por favor, escribe un texto.");
    return;
  }

  let cantidadCaracteres = texto.length;
  let textoLimpio = texto.toLowerCase().replace(/[.,!?;:¿¡()]/g, "");
  let palabras = textoLimpio.trim().split(/\s+/);

  let cantidadPalabras = palabras.length;
  let palabrasMayuscula = texto.match(/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*/g) || [];

  let textoMinusculas = texto.toLowerCase();
  let textoSinEspacios = texto.replace(/\s/g, "");
  let contador = {};

  palabras.forEach(function (palabra) {
    if (contador[palabra]) {
      contador[palabra]++;
    } else {
      contador[palabra] = 1;
    }
  });

  let palabrasUnicas = Object.keys(contador);
  let repetidas = palabrasUnicas.filter(function (palabra) {
    return contador[palabra] > 1;
  });

  let resultadoRepetidas = "";

  if (repetidas.length === 0) {
    resultadoRepetidas = "<p>No hay palabras repetidas.</p>";
  } else {
    repetidas.forEach(function (palabra) {
      resultadoRepetidas +=
        "<p>" + palabra + ": " + contador[palabra] + " veces</p>";
    });
  }

  document.getElementById("resultado").innerHTML =
    "<h3>Estadísticas</h3>" +
    "<p><strong>Caracteres:</strong> " +
    cantidadCaracteres +
    "</p>" +
    "<p><strong>Palabras:</strong> " +
    cantidadPalabras +
    "</p>" +
    "<h3>Palabras que comienzan con mayúscula</h3>" +
    "<p>" +
    (palabrasMayuscula.length > 0
      ? palabrasMayuscula.join(", ")
      : "No se encontraron palabras.") +
    "</p>" +
    "<h3>Texto en minúsculas</h3>" +
    "<p>" +
    textoMinusculas +
    "</p>" +
    "<h3>Texto sin espacios</h3>" +
    "<p>" +
    textoSinEspacios +
    "</p>" +
    "<h3>Palabras repetidas</h3>" +
    resultadoRepetidas;
}

function limpiarTexto() {
  document.getElementById("texto").value = "";
  document.getElementById("resultado").innerHTML =
    '<p class="mensaje-inicial">' + "Los resultados aparecerán aquí." + "</p>";
}
