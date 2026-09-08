# PracticaJS-01 - Cuatro herramientas, un solo espacio
Proyecto desarrollado para la **Práctica Calificada del curso de JavaScript Avanzado**. Reúne cuatro herramientas web construidas con HTML, CSS y JavaScript, aplicando los conocimientos trabajados desde la semana 01 hasta la semana 04 del curso:

- variables y constantes (`let`, `const`)
- operadores y condicionales (`if`, `else`)
- bucles (`for`, `while`)
- funciones declaradas
- funciones anónimas y funciones flecha (lambda)
- arreglos y objetos
- métodos de arreglos (`push`, `forEach`, `map`, `filter`, `some`, `reduce`)
- métodos de cadenas y plantillas de texto (`split`, `trim`, `toLowerCase`, `${}`)
- objeto `Math` (`random`, `floor`, `ceil`, `max`, `min`)
- expresiones regulares (patrones `RegExp` y método `test`)
- manipulación del DOM (`document.getElementById`, `innerHTML`, `textContent`, `addEventListener`, `classList`)
- clases (orientación a objetos del curso)

## Contenido
- 01 - Descripción de la página principal
- 02 - Generador de contraseñas seguras
- 03 - Analizador de texto
- 04 - Gestor de gastos
- 05 - Sorteador de grupos
- 06 - Integrantes
- 07 - Cómo ejecutar el proyecto

## 01 - Descripción de la página principal
La página `index.html` es el punto de entrada del proyecto. Presenta una portada con el título "Cuatro herramientas, un solo espacio" y organiza el contenido en dos secciones:

- **Módulos de la Práctica Calificada:** tarjetas con el acceso a cada herramienta.
- **Integrantes:** presentación del equipo responsable de cada módulo, con sus respectivos avatares.

Desde aquí se navega hacia cada página a través de los botones de las tarjetas, y cada página cuenta con un enlace "Volver" hacia el inicio.

## 02 - Generador de contraseñas seguras
Autora: **Zamira Luana Mendoza Sacsa**.

### Qué hace
Genera contraseñas aleatorias y valida si cumplen los requisitos mínimos de seguridad.

### Pantalla
- Campo de texto donde se muestra la contraseña generada.
- Botón "Generar contraseña".
- Botón "Validar contraseña".
- Lista de requisitos de seguridad.
- Bloque de resultado con los mensajes de validación.

### Cómo funciona
- Define tres conjuntos de caracteres: mayúsculas, minúsculas y números.
- `generarContrasena()` ensambla una contraseña de 10 caracteres, obligando a que incluya al menos un carácter de cada tipo y completando el resto con posiciones aleatorias mediante `Math.random` y `Math.floor`.
- `validarContrasena()` prueba la contraseña con la expresión regular `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$` y el método `test()`, mostrando el resultado según la clase `correcto` o `incorrecto`.
- Utiliza plantillas de texto (`` `${...}` ``) para los mensajes y `console.log` para registrar la contraseña generada.

## 03 - Analizador de texto
Autora: **Ashley Guevara Guerrero**.

### Qué hace
Analiza el contenido de un texto y muestra un resumen con sus estadísticas.

### Pantalla
- Área de texto para escribir o pegar el contenido.
- Botón "Analizar texto".
- Botón "Limpiar".
- Sección de resultados con las estadísticas del análisis.

### Qué resultados muestra
- Cantidad de caracteres.
- Cantidad de palabras.
- Palabras que comienzan con mayúscula.
- El texto convertido en minúsculas.
- El texto sin espacios.
- Las palabras repetidas y su número de apariciones.

### Cómo funciona
- Valida que el texto no esté vacío.
- Limpia el signo de puntuación con expresiones regulares (`replace`) y separa las palabras con `split`.
- Cuenta las apariciones de cada palabra con un objeto contador y recorre las llaves con `forEach` y `filter` para detectar repetidas.
- Escribe los resultados en el DOM con `innerHTML`.

## 04 - Gestor de gastos
Autor: **Mateo Jimenez Chinchay**.

### Qué hace
Registra gastos e informa sobre los montos registrados en distintas categorías.

### Pantalla
- Formulario para agregar un gasto (categoría y monto).
- Lista de los gastos registrados.
- Cálculo del total de gastos.
- Cálculo del total por categoría.
- Identificación de la categoría con mayor gasto.
- Filtrado de gastos mayores a un monto indicado.

### Cómo funciona
- Almacena los gastos en un arreglo `gastos` y los agrega con `push`.
- `mostrarGastos()` recorre el arreglo con un bucle `for` y pinta cada gasto con `innerHTML` y plantillas de texto.
- `calcularTotal()`, `totalPorCategoria()` y `mayorGasto()` recorren el arreglo para sumar, comparar y devolver los resultados.
- `filtrarGastos()` devuelve únicamente los gastos cuyo monto supera el límite indicado.

## 05 - Sorteador de grupos
Autor: **Mauricio Barrutia Ojeda**.

### Qué hace
Distribuye aleatoriamente a un grupo de participantes en equipos, con distintas formas de reparto.

### Pantalla
- Área de texto para la lista de participantes.
- Botones "Cargar ejemplo" y "Limpiar".
- Selector de modo de distribución: "Por grupos" o "Por tamaño".
- Control paso a paso (stepper) para elegir la cantidad.
- Opciones para repartir los sobrantes de forma equilibrada y para designar un coordinador por grupo.
- Métricas del sorteo: total de personas, promedio de integrantes y número de equipos.
- Panel de resultados con las tarjetas de cada grupo y sus integrantes.

### Cómo funciona
- `obtenerParticipantes()` separa la lista en nombres con `split`, limpia cada uno con `trim` y descarta los vacíos con `filter`.
- `barajar()` mezcla la lista con el algoritmo de Fisher-Yates usando `Math.random` y `Math.floor`.
- `calcularNumeroEquipos()` define cuántos equipos formar según el modo y `Math.ceil`.
- El reparto puede ser equilibrado (una persona por grupo en orden, con `forEach`) o por capacidad (llenar cada grupo hasta el tamaño indicado).
- `mostrarGrupos()` construye las tarjetas con plantillas de texto, `map` y `join`, asigna los colores de los grupos y muestra la etiqueta "Líder" cuando corresponde.
- Todos los controles responden mediante `addEventListener`.

## 06 - Integrantes
- Zamira Luana Mendoza Sacsa - Generador de contraseñas y reglas criptográficas.
- Ashley Guevara Guerrero - Analizador de texto y patrones de procesamiento.
- Mateo Jimenez Chinchay - Gestor de gastos y balance computacional.
- Mauricio Barrutia Ojeda - Sorteador de grupos y algoritmos estocásticos.

## 07 - Cómo ejecutar el proyecto
1. Abre la carpeta `practicaJS-01` en tu editor de código.
2. Abre el archivo `index.html` en el navegador, o usa la extensión "Live Server" para servirlo.
3. Navega por las tarjetas de herramientas y usa el enlace "Volver" para regresar al inicio en cualquier momento.