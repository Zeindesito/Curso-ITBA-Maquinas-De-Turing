/**
 * carrrito.js
 * -----------------------------------------------------------------------
 * Lógica del carrito de compras simulado (sin backend).
 * El carrito se guarda en localStorage para que el contador del header
 * se mantenga aunque el usuario navegue entre páginas.
 * Se incluye en TODAS las páginas del sitio.
 * -----------------------------------------------------------------------
 */

const CLAVE_CARRITO = "hj_carrito";

/** Lee el carrito guardado en localStorage. */
function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}

/** Guarda el carrito en localStorage. */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/** Suma la cantidad total de unidades en el carrito. */
function obtenerCantidadTotal() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

/**
 * Agrega un producto al carrito (o suma cantidad si ya estaba).
 * @param {number} id
 * @param {number} cantidad
 */
function agregarAlCarrito(id, cantidad = 1) {
  const carrito = obtenerCarrito();
  const item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad += cantidad;
  } else {
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

/** Actualiza el número que se muestra en el ícono del carrito del header. */
function actualizarContadorCarrito() {
  const contador = document.querySelector("#contador-carrito");
  if (!contador) return;
  const total = obtenerCantidadTotal();
  contador.textContent = total;
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
    const producto = PRODUCTOS.find((p) => p.id === item.id);
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
function inicializarHeader() {
  actualizarContadorCarrito();

  const botonCarrito = document.querySelector("#boton-carrito");
  const miniCarrito = document.querySelector("#mini-carrito");
  const botonVaciar = document.querySelector("#vaciar-carrito");
  const botonMenu = document.querySelector("#boton-menu");
  const nav = document.querySelector("#nav-principal");

  if (botonCarrito && miniCarrito) {
    botonCarrito.addEventListener("click", (evento) => {
      evento.stopPropagation();
      renderizarMiniCarrito();
      miniCarrito.classList.toggle("mini-carrito--abierto");
    });

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

  if (botonMenu && nav) {
    botonMenu.addEventListener("click", () => {
      nav.classList.toggle("nav--abierto");
      const expandido = botonMenu.getAttribute("aria-expanded") === "true";
      botonMenu.setAttribute("aria-expanded", String(!expandido));
    });
  }
}

document.addEventListener("DOMContentLoaded", inicializarHeader);
