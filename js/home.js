/**
 * home.js
 * -----------------------------------------------------------------------
 * Lógica exclusiva de index.html: trae los productos (simulando una
 * petición async) y renderiza las "Piezas Con Alma Propia" (destacados)
 * dentro del DOM.
 * -----------------------------------------------------------------------
 */

/* Arma la tarjeta de un producto y la devuelve lista para insertar.

   Es practicamente la misma funcion que crearTarjetaCatalogo() en
   catalogo.js. Estan duplicadas porque cada pagina carga solo su archivo:
   index.html no carga catalogo.js, asi que no podria reutilizarla. */
function crearTarjetaProducto(producto) {
  // createElement crea la etiqueta en memoria; todavia no esta en la pagina.
  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto";

  // Las comillas invertidas permiten escribir HTML en varias lineas e
  // insertar los datos del producto en los huecos.
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

/* Punto de entrada del home: trae los productos y dibuja los destacados. */
async function iniciarDestacados() {
  const grilla = document.querySelector("#grilla-destacados");
  const cargando = document.querySelector("#destacados-cargando");

  try {
    // await frena la funcion hasta que llega el array. Mientras tanto se ve
    // el cartel de "cargando" y la pagina sigue respondiendo.
    const productos = await obtenerProductos();

    // Cuales se muestran NO se decide aca: cada producto tiene una propiedad
    // "destacado: true/false" en js/data.js. filter() se queda solo con los
    // que la tienen en true. Para cambiar los destacados se edita ese archivo,
    // no este.
    const destacados = productos.filter((p) => p.destacado);

    cargando.classList.add("oculto");

    // appendChild va metiendo una tarjeta atras de la otra dentro de la grilla.
    destacados.forEach((producto) => {
      grilla.appendChild(crearTarjetaProducto(producto));
    });
  } catch (error) {
    cargando.textContent = "No se pudieron cargar las piezas destacadas. Intentá de nuevo más tarde.";
    console.error(error);
  }
}

// DOMContentLoaded espera a que el HTML este armado. Sin esto, el script
// podria buscar #grilla-destacados antes de que exista y recibir null.
document.addEventListener("DOMContentLoaded", iniciarDestacados);
