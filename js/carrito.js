/* ============================================================
   CARRITO  ->  se carga en las 4 páginas

   Puntos de la consigna que cubre este archivo:
   - Carrito simulado con contador en el header
   - Le da soporte al botón "Añadir al Carrito" de producto.html

   Guardamos la lista de productos, no solo la cantidad, para saber
   QUÉ se agregó y no únicamente cuántos.
   ============================================================ */


/* ---------- 1. El contador del header ---------- */

// Este <span> está en las 4 páginas con el mismo id, por eso este
// archivo funciona igual en todas.
const contadorCarrito = document.getElementById("contador-carrito");


/* ---------- 2. Leer y guardar el carrito ---------- */

// localStorage es una cajita del navegador que sobrevive al cambio de
// página y a cerrar la pestaña. Tiene una limitación: SOLO GUARDA TEXTO.
// Un array no entra tal cual, hay que traducirlo.

function leerCarrito() {

    const guardado = localStorage.getItem("carrito");

    // La primera vez que alguien entra al sitio todavía no guardamos nada,
    // y getItem devuelve null. Ahí arrancamos con un carrito vacío.
    if (guardado === null) {
        return [];
    }

    // JSON.parse toma el texto y lo vuelve a convertir en array de objetos.
    return JSON.parse(guardado);
}

function guardarCarrito(carrito) {

    // JSON.stringify hace el camino inverso: convierte el array en texto
    // para que localStorage lo pueda guardar.
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


/* ---------- 3. Mostrar la cantidad en el header ---------- */

function actualizarContador() {

    const carrito = leerCarrito();

    // length es la cantidad de elementos que tiene el array.
    contadorCarrito.textContent = carrito.length;
}


/* ---------- 4. Agregar un producto ---------- */

// A esta función la va a llamar js/detalle.js cuando el usuario apriete
// el botón "Añadir al Carrito".
function agregarAlCarrito(producto) {

    const carrito = leerCarrito();

    // Guardamos solo lo que necesitamos para identificarlo. No hace falta
    // meter la descripción entera ni la ficha técnica.
    carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio
    });

    guardarCarrito(carrito);
    actualizarContador();
}


/* ---------- 5. Vaciar el carrito ---------- */

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContador();
}


/* ---------- 6. Arranque ---------- */

// Al cargar cualquiera de las 4 páginas mostramos el número que había
// quedado guardado de antes.
actualizarContador();
