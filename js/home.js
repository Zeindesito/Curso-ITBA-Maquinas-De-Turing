/* ============================================================
   PRODUCTOS DESTACADOS  ->  index.html

   Punto de la consigna que cubre este archivo:
   - 3-4 productos destacados cargados dinámicamente
   ============================================================ */


/* ---------- 1. Elemento del HTML ---------- */

const contenedorDestacados = document.getElementById("contenedor-destacados");


/* ---------- 2. Cuántos mostramos ---------- */

// La consigna pide entre 3 y 4. Se eligen al azar entre los 11, así que
// en cada recarga de la página aparecen distintos.
const cantidadDestacados = 4;


/* ---------- 3. Dibujar las tarjetas ---------- */

function mostrarDestacados() {

    // Cuántos vamos a mostrar de verdad. Si algún día el array tuviera menos
    // de 4 productos, el for intentaría leer uno que no existe y rompería.
    let cantidad = cantidadDestacados;

    if (productos.length < cantidad) {
        cantidad = productos.length;
    }

    // Hacemos una COPIA del array con slice(). Abajo vamos a ir sacando
    // productos de esta lista, y no queremos romper el array original que
    // usan las otras páginas.
    const disponibles = productos.slice();

    for (let i = 0; i < cantidad; i++) {

        // Math.random() devuelve un número al azar entre 0 y 1 (nunca llega a 1).
        // Multiplicado por la cantidad de productos que quedan, y redondeado
        // para abajo con Math.floor, nos da una posición válida del array.
        const posicion = Math.floor(Math.random() * disponibles.length);

        const producto = disponibles[posicion];

        // Lo sacamos de la lista con splice para que no pueda volver a salir
        // en la próxima vuelta del for. Sin esta línea se repetirían productos.
        disponibles.splice(posicion, 1);

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        // En el home no ponemos la descripción larga: es un adelanto, la
        // información completa está en la página de detalle.
        tarjeta.innerHTML = `
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
            <h3 class="nombre-producto">${producto.nombre}</h3>
            <p class="precio-producto">$${producto.precio}</p>
            <a class="boton-ver-detalle" href="producto.html?id=${producto.id}">Ver detalle</a>
        `;

        contenedorDestacados.appendChild(tarjeta);
    }
}


/* ---------- 4. Arranque ---------- */

mostrarDestacados();
