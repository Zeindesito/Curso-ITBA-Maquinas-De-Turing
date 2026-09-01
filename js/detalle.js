/* ============================================================
   DETALLE DE PRODUCTO  ->  producto.html

   Puntos de la consigna que cubre este archivo:
   - Imagen grande y descripción completa
   - Detalles de fabricación y precio
   - Botón "Añadir al Carrito"
   ============================================================ */


/* ---------- 1. Elementos del HTML ---------- */

const contenedorDetalle = document.getElementById("detalle-producto-principal");


/* ---------- 2. Averiguar qué producto hay que mostrar ---------- */

// Desde el catálogo llegamos acá con un link así:  producto.html?id=3
// URLSearchParams sabe leer la parte de la dirección que va después del "?".
const parametros = new URLSearchParams(window.location.search);
const idTexto = parametros.get("id");

// OJO con esto: lo que viene de la URL SIEMPRE es texto, nunca número.
// El id del array en cambio es número. Si compararamos "3" === 3 nunca
// darían iguales, así que lo convertimos con Number().
const idBuscado = Number(idTexto);


/* ---------- 3. Buscarlo en el array ---------- */

function buscarProducto(id) {

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            return productos[i]; // lo encontramos, cortamos acá
        }
    }

    // Si el for terminó sin encontrar nada, avisamos con null.
    return null;
}

const productoElegido = buscarProducto(idBuscado);


/* ---------- 4. Dibujar el producto ---------- */

function mostrarDetalle(producto) {

    // Primero armamos la ficha técnica recorriendo el array "detalles".
    // Vamos pegando el HTML de cada fila en una misma variable de texto.
    let filasFicha = "";

    for (let i = 0; i < producto.detalles.length; i++) {

        const dato = producto.detalles[i];

        filasFicha += `
            <li class="fila-ficha">
                <span class="etiqueta-ficha">${dato.etiqueta}</span>
                <span class="valor-ficha">${dato.valor}</span>
            </li>
        `;
    }

    // Y después metemos todo junto en la página.
    contenedorDetalle.innerHTML = `
        <img class="imagen-detalle" src="${producto.imagen}" alt="${producto.nombre}">

        <div class="info-detalle">
            <h1 class="nombre-detalle">${producto.nombre}</h1>

            <p class="descripcion-detalle">${producto.descripcion}</p>

            <ul class="ficha-tecnica">
                ${filasFicha}
            </ul>

            <p class="precio-detalle">$${producto.precio}</p>

            <button class="boton-principal" id="boton-agregar">AÑADIR AL CARRITO</button>
        </div>
    `;
}


/* ---------- 5. Arranque ---------- */

// Puede pasar que alguien entre a producto.html sin ?id, o con un id que
// no existe. En ese caso no hay nada que mostrar y avisamos.
if (productoElegido === null) {

    contenedorDetalle.innerHTML = `
        <p>No encontramos ese producto.</p>
        <a href="productos.html">Volver al catálogo</a>
    `;

} else {

    mostrarDetalle(productoElegido);

    // El botón recién existe DESPUÉS de que mostrarDetalle escribió el HTML.
    // Por eso lo buscamos acá abajo y no al principio del archivo: antes de
    // dibujar, getElementById devolvería null.
    const botonAgregar = document.getElementById("boton-agregar");

    botonAgregar.addEventListener("click", function () {

        // agregarAlCarrito vive en js/carrito.js. Esa función ya se encarga
        // sola de guardar el producto y de actualizar el número del header.
        agregarAlCarrito(productoElegido);
    });
}
