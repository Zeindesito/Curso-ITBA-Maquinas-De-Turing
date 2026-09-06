/**
 * api.js
 * -----------------------------------------------------------------------
 * Simula una petición asíncrona a un servidor (como haría un fetch real)
 * para traer el catálogo de productos. Usamos una Promise + setTimeout
 * para simular la latencia de red, y funciones "async" para consumirla
 * con await en el resto del proyecto.
 * -----------------------------------------------------------------------
 */

// Cuanto tarda a proposito cada peticion falsa. Subiendo este numero se ve
// mas tiempo el cartel de "Cargando"; bajandolo a 0 el sitio parece instantaneo.
const RETRASO_SIMULADO_MS = 700;

/**
 * Simula la petición GET /productos de una API.
 * @returns {Promise<Array>} Promesa que resuelve con el array de productos.
 */
/* Como funciona esta funcion, que es la mas importante del archivo:

   1. Devuelve una Promise AL INSTANTE. Una promesa es una caja vacia con el
      compromiso de traer un dato mas adelante.
   2. Adentro, setTimeout deja programado que dentro de 700 ms se ejecute
      resolve(PRODUCTOS).
   3. Durante esos 700 ms la pagina NO se congela: el usuario puede scrollear
      y hacer click. Esa es toda la razon de ser del codigo asincronico.
   4. Pasado el tiempo, resolve() llena la caja con el array.
   5. Recien ahi se destraba el "await obtenerProductos()" de quien la llamo.

   PRODUCTOS viene de js/data.js, que se carga antes en el HTML. */
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
/* Igual que la anterior, pero busca UN producto por su id.

   Number(id) es la linea clave: el id llega desde la URL (producto.html?id=3)
   y de ahi siempre sale TEXTO. En el array los id son numeros. Comparar
   "3" === 3 da false, asi que sin esta conversion no encontraria nunca nada.

   Si find() no encuentra nada devuelve undefined, y detalle.js usa eso para
   mostrar el cartel de "producto no encontrado". */
function obtenerProductoPorId(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const producto = PRODUCTOS.find((p) => p.id === Number(id));
      resolve(producto);
    }, RETRASO_SIMULADO_MS);
  });
}

/* Convierte el numero 38900 en el texto "$38,900 ARS".

   toLocaleString le pone los separadores de miles segun el pais que le pases.
   maximumFractionDigits: 0 saca los decimales, porque los precios son enteros.

   OJO, hay una inconsistencia heredada: el codigo usa "es-MX" (Mexico) pero
   despues escribe "ARS" (pesos argentinos). Funciona, pero conviene
   emprolijarlo a "es-AR" antes de entregar. */
function formatearPrecio(valor) {
  const numero = valor.toLocaleString("es-AR", { maximumFractionDigits: 0 });
  return `$${numero} ARS`;
}
