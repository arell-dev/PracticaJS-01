let gastos = [];

// AGREGAR GASTO
function agregarGasto() {
    let categoria = document.getElementById("categoria").value;
    let monto = Number(document.getElementById("monto").value);

    if (categoria.trim() === "" || isNaN(monto) || monto <= 0) {
        alert("Ingrese una categoría y un monto válido");
        return;
    }

    categoria = categoria.trim();

    let gasto = {
        categoria: categoria,
        monto: monto
    };

    gastos.push(gasto);

    alert("Gasto agregado");

    document.getElementById("categoria").value = "";
    document.getElementById("monto").value = "";

    mostrarGastos();
}


// MOSTRAR GASTOS
function mostrarGastos() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    for (let i = 0; i < gastos.length; i++) {
        resultado.innerHTML += `<p>Categoría: ${gastos [i].categoria} Monto: S/ ${gastos[i].monto}</p>`;
    }
}


// TOTAL DE GASTOS
function calcularTotal() {
    let total = 0;

    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].monto;
    }

    document.getElementById("total").innerHTML =
        "Total gastado: S/ " + total;
}


// TOTAL POR CATEGORIA
function totalPorCategoria() {
    let categoria = document.getElementById("categoriaTotal").value;
    let total = 0;

    categoria = categoria.trim().toLowerCase();

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].categoria.toLowerCase() === categoria) {
            total = total + gastos[i].monto;
        }
    }

    document.getElementById("resultadoCategoria").innerHTML =
        "Total en " + categoria + ": S/ " + total;
}

// CATEGORIA CON MAYOR GASTO
function mayorGasto() {
    if (gastos.length === 0) {
        alert("No hay gastos registrados");
        return;
    }

    let categorias = [];
    let totales = [];

    for (let i = 0; i < gastos.length; i++) {
        let categoria = gastos[i].categoria;
        let encontrada = false;

        for (let j = 0; j < categorias.length; j++) {
            if (categorias[j].toLowerCase() === categoria.toLowerCase()) {
                totales[j] = totales[j] + gastos[i].monto;
                encontrada = true;
            }
        }

        if (encontrada === false) {
            categorias.push(categoria);
            totales.push(gastos[i].monto);
        }
    }

    let mayor = totales[0];
    let categoriaMayor = categorias[0];

    for (let i = 1; i < totales.length; i++) {
        if (totales[i] > mayor) {
            mayor = totales[i];
            categoriaMayor = categorias[i];
        }
    }

    document.getElementById("mayor").innerHTML =
        "La categoría con mayor gasto es: " + categoriaMayor + " con S/ " + mayor;
}


// FILTRAR GASTOS
function filtrarGastos() {
    let montoFiltro = Number(document.getElementById("filtro").value);
    let resultado = document.getElementById("resultadoFiltro");

    resultado.innerHTML = "";

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].monto > montoFiltro) {
            resultado.innerHTML +=
                " Categoria: " + gastos[i].categoria + " \n Monto: Soles: " + gastos[i].monto;
        }
    }
}