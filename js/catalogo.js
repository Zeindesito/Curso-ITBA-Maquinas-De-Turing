/* ============================================================
   CATÁLOGO DE PRODUCTOS  ->  productos.html

   Puntos de la consigna:
   - Grilla de tarjetas de productos
   - Datos desde archivo JavaScript local (data/productos.js)
   - Cada producto enlaza a su detalle
   - Carga asíncrona simulada (setTimeout + async/await)
   - Renderizado dinámico vía DOM
   - Interactividad con addEventListener (campo de búsqueda)
   ============================================================ */


/* ---------- 1. Agarramos los elementos del HTML ---------- */

// getElementById busca en productos.html el elemento con ese id
// y nos lo guarda en una variable para poder trabajarlo desde acá.
const contenedorCatalogo = document.getElementById("contenedor-catalogo");
const campoBusqueda = document.getElementById("campo-busqueda");

// Acá vamos a guardar los productos una vez que terminen de "cargar".
// Empieza vacío y lo llenamos más abajo.
let productosCargados = [];


/* ---------- 2. Carga asíncrona simulada ---------- */

// La consigna pide simular que los datos tardan en llegar, como si
// los pidiéramos a un servidor.
// Una Promise es una "promesa de un dato que todavía no está".
// resolve() es la función que avisa "listo, acá está el dato".
// setTimeout espera 1000 milisegundos (1 segundo) antes de ejecutarlo.
function pedirProductos() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(productos); // "productos" viene de data/productos.js
        }, 1000);
    });
}


/* ---------- 3. Dibujar las tarjetas en la grilla ---------- */

function mostrarProductos(lista) {

    // Vaciamos la grilla antes de dibujar.
    // Si no lo hiciéramos, cada vez que buscamos se apilarían las tarjetas.
    contenedorCatalogo.innerHTML = "";

    // Si la lista quedó vacía (ej: buscaste algo que no existe), avisamos y cortamos.
    if (lista.length === 0) {
        contenedorCatalogo.innerHTML = "<p>No encontramos productos con ese nombre.</p>";
        return;
    }

    // Recorremos la lista producto por producto.
    for (let i = 0; i < lista.length; i++) {

        const producto = lista[i];

        // createElement crea una etiqueta nueva que todavía no está en la página.
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        // innerHTML le mete el contenido adentro.
        // Las comillas ` ` permiten escribir en varias líneas e insertar
        // valores con ${ }.
        tarjeta.innerHTML = `
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
            <h3 class="nombre-producto">${producto.nombre}</h3>
            <p class="descripcion-producto">${producto.descripcion}</p>
            <p class="precio-producto">$${producto.precio}</p>
            <a class="boton-ver-detalle" href="producto.html?id=${producto.id}">Ver detalle</a>
        `;

        // appendChild recién ahora mete la tarjeta terminada dentro de la grilla.
        contenedorCatalogo.appendChild(tarjeta);
    }
}


/* ---------- 4. Campo de búsqueda (el bonus de la consigna) ---------- */

// Para JavaScript la "ó" y la "o" son dos caracteres distintos, así que
// buscar "sillon" no encontraría "Sillón Copacabana".
// Esta función devuelve el mismo texto pero con las vocales sin acento.
// replaceAll cambia TODAS las apariciones de una letra (replace cambiaría
// solo la primera).
function sacarTildes(texto) {
    return texto
        .replaceAll("á", "a")
        .replaceAll("é", "e")
        .replaceAll("í", "i")
        .replaceAll("ó", "o")
        .replaceAll("ú", "u")
}

// addEventListener escucha un evento. "input" se dispara cada vez que
// el usuario escribe o borra una letra en el campo.
campoBusqueda.addEventListener("input", function () {

    // Preparamos lo que escribió el usuario:
    // 1) toLowerCase lo pasa a minúscula, así "SILLA" también encuentra "Silla".
    // 2) sacarTildes le saca los acentos.
    // El orden importa: primero minúscula, porque sacarTildes solo conoce las
    // vocales en minúscula. Una "Ó" ya llega convertida en "ó".
    const texto = sacarTildes(campoBusqueda.value.toLowerCase());

    // Armamos una lista nueva solo con los productos que coinciden.
    const encontrados = [];

    for (let i = 0; i < productosCargados.length; i++) {

        // Al nombre del producto le hacemos EXACTAMENTE lo mismo que al texto
        // buscado. Si tratáramos distinto a los dos lados, no coincidirían nunca.
        const nombre = sacarTildes(productosCargados[i].nombre.toLowerCase());

        // includes devuelve true si el nombre contiene el texto buscado.
        if (nombre.includes(texto)) {
            encontrados.push(productosCargados[i]);
        }
    }

    mostrarProductos(encontrados);
});


/* ---------- 5. Arranque de la página ---------- */

// async marca que esta función tiene una espera adentro.
// await frena la función hasta que pedirProductos() devuelva el array.
async function iniciarCatalogo() {

    contenedorCatalogo.innerHTML = "<p>Cargando productos...</p>";

    productosCargados = await pedirProductos();

    mostrarProductos(productosCargados);
}

// Llamamos a la función para que todo empiece.
iniciarCatalogo();
