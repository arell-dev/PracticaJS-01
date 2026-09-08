// Elementos del HTML
const textarea = document.getElementById("lista-participantes");
const contadorDetectados = document.getElementById("contador-detectados");
const btnCargarEjemplo = document.getElementById("btn-cargar-ejemplo");
const btnLimpiar = document.getElementById("btn-limpiar");
const modoGrupos = document.getElementById("modo-grupos");
const modoTamano = document.getElementById("modo-tamano");
const etiquetaObjetivo = document.getElementById("etiqueta-objetivo");
const descripcionObjetivo = document.getElementById("descripcion-objetivo");
const valorObjetivo = document.getElementById("valor-objetivo");
const btnDisminuir = document.getElementById("btn-disminuir");
const btnAumentar = document.getElementById("btn-aumentar");
const opcionEquilibrado = document.getElementById("opcion-equilibrado");
const opcionCoordinador = document.getElementById("opcion-coordinador");
const btnSortear = document.getElementById("btn-sortear");
const btnRemezclar = document.getElementById("btn-remezclar");
const contenedorGrupos = document.getElementById("contenedor-grupos");
const resumenResultados = document.getElementById("resumen-resultados");
const metricaTotal = document.getElementById("metrica-total");
const metricaPromedio = document.getElementById("metrica-promedio");
const metricaEquipos = document.getElementById("metrica-equipos");

// Lista de ejemplo para probar el sorteador
const ejemplo = [
  "Juan Perez",
  "Pepe Nitales",
  "Tavara Mancora",
  "Julio Guerrero",
  "Juana Mendoza",
  "Adriana Salte",
];

// Colores para distinguir los grupos
const puntos = ["punto-verde", "punto-violeta", "punto-celeste", "punto-ambar", "punto-rojo"];

// Estado del sorteador
let modoActual = "grupos";
let cantidadObjetivo = 3;
let gruposActuales = [];

// Obtener los participantes escritos en el textarea
function obtenerParticipantes() {
  const participantes = textarea.value
    .split(/[\n,]+/)
    .map((nombre) => nombre.trim())
    .filter((nombre) => nombre !== "");
  return participantes;
}

// Calcular cuántos equipos se deben formar según el modo
function calcularNumeroEquipos(total) {
  if (modoActual === "grupos") {
    // no pueden hacerse más grupos que participantes
    if (cantidadObjetivo > total) {
      return total;
    }
    return cantidadObjetivo;
  }

  // por tamaño: cuántos grupos se necesitan para cubrir a todos
  const gruposNecesarios = Math.ceil(total / cantidadObjetivo);
  if (gruposNecesarios < 1) {
    return 1;
  }
  return gruposNecesarios;
}

// Actualizar los contadores del panel de configuración
function actualizarMetricas() {
  const participantes = obtenerParticipantes();
  const total = participantes.length;

  contadorDetectados.textContent = total + " detectados";
  metricaTotal.textContent = total;

  if (total === 0) {
    metricaPromedio.textContent = "0";
    metricaEquipos.textContent = "0";
    return;
  }

  const numeroEquipos = calcularNumeroEquipos(total);
  const promedio = total / numeroEquipos;

  metricaPromedio.textContent = promedio.toFixed(1);
  metricaEquipos.textContent = numeroEquipos;
}

// Barajar los participantes con el algoritmo de Fisher-Yates
function barajar(lista) {
  // copiar la lista para no modificar la original
  const copia = [];
  for (let i = 0; i < lista.length; i++) {
    copia.push(lista[i]);
  }

  // recorrer la copia de atrás hacia adelante
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // intercambiar la posición i con la posición j
    const temporal = copia[i];
    copia[i] = copia[j];
    copia[j] = temporal;
  }

  return copia;
}

// Crear los grupos con los participantes mezclados
function crearGrupos() {
  const participantes = obtenerParticipantes();

  if (participantes.length === 0) {
    gruposActuales = [];
    mostrarGrupos();
    return;
  }

  const mezclados = barajar(participantes);
  const numeroEquipos = calcularNumeroEquipos(participantes.length);

  // crear una casilla vacía por cada equipo
  const grupos = [];
  for (let i = 0; i < numeroEquipos; i++) {
    grupos.push([]);
  }

  // reparto equilibrado: una persona por grupo, en orden
  if (opcionEquilibrado.checked || modoActual === "grupos") {
    mezclados.forEach((persona, indice) => {
      const indiceGrupo = indice % numeroEquipos;
      grupos[indiceGrupo].push(persona);
    });
  } else {
    // reparto por capacidad: llenar cada grupo hasta el tamaño indicado
    let indiceGrupo = 0;
    for (let i = 0; i < mezclados.length; i++) {
      const grupoLleno = grupos[indiceGrupo].length >= cantidadObjetivo;
      const noEsElUltimo = indiceGrupo < numeroEquipos - 1;

      if (grupoLleno && noEsElUltimo) {
        indiceGrupo++;
      }
      grupos[indiceGrupo].push(mezclados[i]);
    }
  }

  // quedarse solo con los grupos que tienen participantes
  gruposActuales = grupos.filter((grupo) => grupo.length > 0);

  mostrarGrupos();
}

// Mostrar los grupos generados en el panel de resultados
function mostrarGrupos() {
  const numeroEquipos = gruposActuales.length;

  // sumar todos los integrantes de los grupos
  let totalPersonas = 0;
  for (let i = 0; i < numeroEquipos; i++) {
    totalPersonas = totalPersonas + gruposActuales[i].length;
  }

  resumenResultados.textContent =
    numeroEquipos + " grupos de " + totalPersonas + " integrantes";
  metricaEquipos.textContent = numeroEquipos;

  if (numeroEquipos === 0) {
    metricaPromedio.textContent = "0";
  } else {
    const promedio = totalPersonas / numeroEquipos;
    metricaPromedio.textContent = promedio.toFixed(1);
  }

  if (numeroEquipos === 0) {
    contenedorGrupos.innerHTML = `
      <div class="sin-grupos">
        <p>No hay participantes registrados</p>
        <span>Escribe nombres o carga la lista de ejemplo.</span>
      </div>
    `;
    return;
  }

  // construir el HTML de los grupos
  let htmlGrupos = "";
  for (let i = 0; i < numeroEquipos; i++) {
    const grupo = gruposActuales[i];

    // etiqueta del grupo con dos dígitos
    const numero = i + 1;
    const etiquetaNumero = numero < 10 ? "0" + numero : numero;
    const colorPunto = puntos[i % puntos.length];

    // construir la lista de integrantes
    const htmlIntegrantes = grupo
      .map((persona, j) => {
        const esPrimero = j === 0;
        const badgeLider =
          opcionCoordinador.checked && esPrimero
            ? '<span class="coordinador">Líder</span>'
            : "";

        return `<li>
          <span class="indice">${j + 1}.</span>
          <span class="nombre">${persona}</span>
          ${badgeLider}
        </li>`;
      })
      .join("");

    htmlGrupos =
      htmlGrupos +
      `<article class="tarjeta">
        <div class="tarjeta-cabecera">
          <div>
            <span class="punto ${colorPunto}"></span>
            <h3>Grupo ${etiquetaNumero}</h3>
          </div>
          <span class="cantidad">${grupo.length} int.</span>
        </div>
        <ul>${htmlIntegrantes}</ul>
      </article>`;
  }

  contenedorGrupos.innerHTML = htmlGrupos;
}

// Activar un segmento del selector y desactivar el otro
function activarSegmento(activo, inactivo) {
  activo.classList.add("activo");
  inactivo.classList.remove("activo");
}

// Eventos del textarea
textarea.addEventListener("input", function () {
  actualizarMetricas();
});

btnCargarEjemplo.addEventListener("click", function () {
  textarea.value = ejemplo.join("\n");
  actualizarMetricas();
  crearGrupos();
});

btnLimpiar.addEventListener("click", function () {
  textarea.value = "";
  actualizarMetricas();
  crearGrupos();
});

// Modo de distribución
modoGrupos.addEventListener("click", function () {
  modoActual = "grupos";
  activarSegmento(modoGrupos, modoTamano);
  etiquetaObjetivo.textContent = "Cantidad de grupos";
  descripcionObjetivo.textContent = "Total de equipos a formar";
  cantidadObjetivo = 3;
  valorObjetivo.textContent = cantidadObjetivo;
  actualizarMetricas();
  crearGrupos();
});

modoTamano.addEventListener("click", function () {
  modoActual = "tamano";
  activarSegmento(modoTamano, modoGrupos);
  etiquetaObjetivo.textContent = "Tamaño de grupo";
  descripcionObjetivo.textContent = "Máximo de integrantes por equipo";
  cantidadObjetivo = 4;
  valorObjetivo.textContent = cantidadObjetivo;
  actualizarMetricas();
  crearGrupos();
});

// Stepper de la cantidad
btnDisminuir.addEventListener("click", function () {
  if (cantidadObjetivo > 1) {
    cantidadObjetivo--;
    valorObjetivo.textContent = cantidadObjetivo;
    actualizarMetricas();
    crearGrupos();
  }
});

btnAumentar.addEventListener("click", function () {
  const total = obtenerParticipantes().length || 50;
  if (cantidadObjetivo < total) {
    cantidadObjetivo++;
    valorObjetivo.textContent = cantidadObjetivo;
    actualizarMetricas();
    crearGrupos();
  }
});

// Opciones de distribución
opcionEquilibrado.addEventListener("change", crearGrupos);
opcionCoordinador.addEventListener("change", mostrarGrupos);

// Acciones principales
btnSortear.addEventListener("click", crearGrupos);

// Inicialización: cargar el ejemplo, calcular métricas y generar el primer sorteo
textarea.value = ejemplo.join("\n");
actualizarMetricas();
crearGrupos();