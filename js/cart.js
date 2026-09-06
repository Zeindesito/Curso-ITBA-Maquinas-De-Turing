/**
 * cart.js
 * -----------------------------------------------------------------------
 * Lógica del carrito de compras simulado (sin backend).
 * El carrito se guarda en localStorage para que el contador del header
 * se mantenga aunque el usuario navegue entre páginas.
 * Se incluye en TODAS las páginas del sitio.
 * -----------------------------------------------------------------------
 */

// El nombre del cajon donde guardamos el carrito. Tiene que ser el mismo al
// leer y al escribir, por eso esta en una constante y no repetido a mano.
const CLAVE_CARRITO = "hj_carrito";

/* localStorage es una cajita del navegador que sobrevive al cambio de pagina
   y a cerrar la pestana. Tiene una limitacion importante: SOLO GUARDA TEXTO.
   Un array no entra tal cual, hay que traducirlo en los dos sentidos.

   Al leer: si nunca guardamos nada, getItem devuelve null. El operador
   ternario cubre ese caso devolviendo un array vacio, para que quien la llame
   siempre reciba un array y nunca reviente. */
function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  // JSON.parse toma el texto guardado y lo vuelve a convertir en array.
  return datos ? JSON.parse(datos) : [];
}

/* JSON.stringify hace el camino inverso: aplasta el array a texto para que
   localStorage lo pueda guardar. */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/* Suma las unidades de todos los items para el numerito del header.

   reduce() recorre el array acumulando un resultado. El 0 del final es el
   valor con el que arranca el acumulador. Si el carrito tiene
   [{cantidad: 2}, {cantidad: 3}] devuelve 5, no 2.

   Es la diferencia entre "2 productos distintos" y "5 unidades". */
function obtenerCantidadTotal() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

/**
 * Agrega un producto al carrito (o suma cantidad si ya estaba).
 * @param {number} id
 * @param {number} cantidad
 */
/* La funcion que llama detalle.js desde el boton "Anadir Al Carrito".

   IMPORTANTE: recibe el ID (un numero), no el objeto producto entero. Si le
   pasaras el objeto, el find() de abajo nunca coincidiria y guardaria basura.

   El "cantidad = 1" es un valor por defecto: si la llamas con
   agregarAlCarrito(3) sin segundo argumento, cantidad vale 1.

   Guardamos solo { id, cantidad } y no el producto completo. Los datos del
   mueble ya estan en data.js; duplicarlos en localStorage seria repetir
   informacion que despues se puede desincronizar. */
function agregarAlCarrito(id, cantidad = 1) {
  const carrito = obtenerCarrito();

  // Si el producto ya estaba, sumamos unidades en vez de agregarlo de nuevo.
  const item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad += cantidad;
  } else {
    // { id, cantidad } es la forma corta de escribir { id: id, cantidad: cantidad }.
    carrito.push({ id, cantidad });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
}

/** Vacía todo el carrito. */
function vaciarCarrito() {
  guardarCarrito([]);
  actualizarContadorCarrito();
}

/* Refresca el numerito del header. Se llama al cargar cualquier pagina y
   cada vez que cambia el carrito. */
function actualizarContadorCarrito() {
  const contador = document.querySelector("#contador-carrito");

  // Guarda de seguridad: si por lo que sea el elemento no existe en esta
  // pagina, cortamos en vez de reventar con "cannot set property of null".
  if (!contador) return;

  const total = obtenerCantidadTotal();
  contador.textContent = total;

  // toggle con segundo argumento: agrega "oculto" si total es 0 y la saca si
  // no. Asi la bolita desaparece cuando el carrito esta vacio.
  contador.classList.toggle("oculto", total === 0);
}

/**
 * Arma el contenido del mini-carrito desplegable del header,
 * cruzando los ids guardados con los datos completos de PRODUCTOS.
 */
function renderizarMiniCarrito() {
  const lista = document.querySelector("#lista-mini-carrito");
  const vacioMsg = document.querySelector("#mini-carrito-vacio");
  if (!lista) return;

  const carrito = obtenerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    if (vacioMsg) vacioMsg.hidden = false;
    return;
  }
  if (vacioMsg) vacioMsg.hidden = true;

  carrito.forEach((item) => {
    // En localStorage solo guardamos { id, cantidad }. Para mostrar el nombre
    // y la foto hay que cruzar ese id contra los datos completos de data.js.
    const producto = PRODUCTOS.find((p) => p.id === item.id);

    // Si el id guardado ya no existe en el catalogo (por ejemplo, borraron el
    // producto), salteamos ese item en vez de romper la lista.
    if (!producto) return;

    const li = document.createElement("li");
    li.className = "mini-carrito__item";
    li.innerHTML = `
      <img src="${rutaRelativaAssets(producto.imagen)}" alt="${producto.nombre}" class="mini-carrito__img">
      <div class="mini-carrito__info">
        <p class="mini-carrito__nombre">${producto.nombre}</p>
        <p class="mini-carrito__detalle">${item.cantidad} x ${formatearPrecio(producto.precio)}</p>
      </div>
    `;
    lista.appendChild(li);
  });
}

/**
 * Las páginas viven en distintos niveles (raíz), pero por consistencia
 * dejamos este helper por si en el futuro se agregan subcarpetas.
 */
function rutaRelativaAssets(ruta) {
  return ruta;
}

/**
 * Inicializa el comportamiento del header: contador + apertura/cierre
 * del mini-carrito + menú hamburguesa para mobile.
 */
/* Prepara todo el header. Como cart.js se carga en las CUATRO paginas, esta
   funcion corre en todas.

   Fijate que cada bloque esta protegido con un if: los elementos del
   mini-carrito y del menu hamburguesa pueden no existir en alguna pagina, y
   asi no revienta nada. */
function inicializarHeader() {
  actualizarContadorCarrito();

  const botonCarrito = document.querySelector("#boton-carrito");
  const miniCarrito = document.querySelector("#mini-carrito");
  const botonVaciar = document.querySelector("#vaciar-carrito");
  const botonMenu = document.querySelector("#boton-menu");
  const nav = document.querySelector("#nav-principal");

  if (botonCarrito && miniCarrito) {
    botonCarrito.addEventListener("click", (evento) => {
      // stopPropagation frena el click aca. Sin esto, el click seguiria
      // subiendo hasta el document y el listener de abajo cerraria el panel
      // en el mismo instante en que lo abrimos.
      evento.stopPropagation();
      renderizarMiniCarrito();
      miniCarrito.classList.toggle("mini-carrito--abierto");
    });

    // Cerrar al hacer click afuera: escuchamos TODOS los clicks del documento
    // y cerramos solo si el click no fue adentro del panel ni en el boton.
    // contains() pregunta si el elemento clickeado esta dentro del mini-carrito.
    document.addEventListener("click", (evento) => {
      if (!miniCarrito.contains(evento.target) && evento.target !== botonCarrito) {
        miniCarrito.classList.remove("mini-carrito--abierto");
      }
    });
  }

  if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
      vaciarCarrito();
      renderizarMiniCarrito();
    });
  }

  // --- Menu hamburguesa (solo se ve en pantallas chicas) ---
  if (botonMenu && nav) {
    botonMenu.addEventListener("click", () => {
      nav.classList.toggle("nav--abierto");

      // aria-expanded le avisa a los lectores de pantalla si el menu esta
      // abierto o cerrado. Lo leemos, lo damos vuelta con el signo de
      // admiracion y lo volvemos a escribir como texto.
      const expandido = botonMenu.getAttribute("aria-expanded") === "true";
      botonMenu.setAttribute("aria-expanded", String(!expandido));
    });
  }
}

document.addEventListener("DOMContentLoaded", inicializarHeader);
