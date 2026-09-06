/**
 * api.js
 * -----------------------------------------------------------------------
 * Simula una petición asíncrona a un servidor (como haría un fetch real)
 * para traer el catálogo de productos. Usamos una Promise + setTimeout
 * para simular la latencia de red, y funciones "async" para consumirla
 * con await en el resto del proyecto.
 * -----------------------------------------------------------------------
 */

const RETRASO_SIMULADO_MS = 700;

/**
 * Simula la petición GET /productos de una API.
 * @returns {Promise<Array>} Promesa que resuelve con el array de productos.
 */
function obtenerProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTOS);
    }, RETRASO_SIMULADO_MS);
  });
}

/**
 * Simula la petición GET /productos/:id de una API.
 * @param {number} id
 * @returns {Promise<Object|undefined>} Promesa que resuelve con el producto
 * encontrado, o undefined si no existe.
 */
function obtenerProductoPorId(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const producto = PRODUCTOS.find((p) => p.id === Number(id));
      resolve(producto);
    }, RETRASO_SIMULADO_MS);
  });
}

/**
 * Formatea un número como precio en pesos mexicanos.
 * @param {number} valor
 * @returns {string}
 */
function formatearPrecio(valor) {
  const numero = valor.toLocaleString("es-MX", { maximumFractionDigits: 0 });
  return `$${numero} MXN`;
}
