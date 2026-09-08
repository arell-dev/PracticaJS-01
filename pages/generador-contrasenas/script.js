const mayuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minuscula = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";

function generarContrasena() {
    const todosLosCaracteres = mayuscula + minuscula + numeros;
    let contrasena = "";

    contrasena += mayuscula[Math.floor(Math.random() * mayuscula.length)];
    contrasena += minuscula[Math.floor(Math.random() * minuscula.length)];
    contrasena += numeros[Math.floor(Math.random() * numeros.length)];

    for (let i = 3; i < 10; i++) {
        let posicion = Math.floor(Math.random() * todosLosCaracteres.length);
        contrasena += todosLosCaracteres[posicion];
    }

    document.getElementById("contrasena").value = contrasena;
    document.getElementById("resultado").innerHTML = "Contraseña generada. Presiona Validar contraseña.";
    document.getElementById("resultado").className = "";
    console.log(contrasena);
}

function validarContrasena() {
    const contrasena = document.getElementById("contrasena").value;
    const resultado = document.getElementById("resultado");

    if (contrasena.trim() === "") {
        resultado.innerHTML = "Primero genera o escribe una contraseña.";
        resultado.className = "incorrecto";
        return;
    }

    const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (patronContrasena.test(contrasena)) {
        resultado.innerHTML = `La contraseña "${contrasena}" es segura.`;
        resultado.className = "correcto";
        
    } else {
        resultado.innerHTML = `La contraseña "${contrasena}" no cumple los requisitos.`;
        resultado.className = "incorrecto";
    }
}
