/**
 * home.js
 * -----------------------------------------------------------------------
 * Lógica exclusiva de index.html: trae los productos (simulando una
 * petición async) y renderiza las "Piezas Con Alma Propia" (destacados)
 * dentro del DOM.
 * -----------------------------------------------------------------------
 */

/** Crea el elemento <article> de una tarjeta de producto. */
function crearTarjetaProducto(producto) {
  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto";

  articulo.innerHTML = `
    <a href="producto.html?id=${producto.id}" class="tarjeta-producto__imagen">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
    </a>
    <div class="tarjeta-producto__cabecera">
      <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
      <span class="tarjeta-producto__precio">${formatearPrecio(producto.precio)}</span>
    </div>
    <p class="tarjeta-producto__descripcion">${producto.descripcionCorta}</p>
    <a href="producto.html?id=${producto.id}" class="enlace-detalle">Ver Detalles →</a>
  `;

  return articulo;
}

async function iniciarDestacados() {
  const grilla = document.querySelector("#grilla-destacados");
  const cargando = document.querySelector("#destacados-cargando");

  try {
    const productos = await obtenerProductos(); // petición simulada (Promise + setTimeout)
    const destacados = productos.filter((p) => p.destacado);

    cargando.classList.add("oculto");

    destacados.forEach((producto) => {
      grilla.appendChild(crearTarjetaProducto(producto));
    });
  } catch (error) {
    cargando.textContent = "No se pudieron cargar las piezas destacadas. Intentá de nuevo más tarde.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", iniciarDestacados);
