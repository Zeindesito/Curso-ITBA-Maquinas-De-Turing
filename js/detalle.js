/**
 * detalle.js
 * -----------------------------------------------------------------------
 * Lógica exclusiva de producto.html:
 *  - Lee el "id" del producto desde la URL (?id=...).
 *  - Trae el producto (petición simulada async/await).
 *  - Renderiza los datos, el selector de acabado y las piezas
 *    complementarias en el DOM.
 *  - Maneja el botón "Añadir al carrito" con addEventListener.
 * -----------------------------------------------------------------------
 */

let acabadoSeleccionado = null;

function obtenerIdDeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

function pintarProducto(producto) {
  document.querySelector("#titulo-pagina").textContent = `${producto.nombre} | Hermanos Jota`;
  document.querySelector("#detalle-imagen").src = producto.imagen;
  document.querySelector("#detalle-imagen").alt = producto.nombre;
  document.querySelector("#detalle-nombre").textContent = producto.nombre;
  document.querySelector("#detalle-precio").textContent = formatearPrecio(producto.precio);
  document.querySelector("#detalle-descripcion").textContent = producto.descripcionLarga;
  document.querySelector("#detalle-dimensiones").textContent = producto.dimensiones;
  document.querySelector("#detalle-material").textContent = producto.materiales;
  document.querySelector("#detalle-peso").textContent = `${producto.peso} kg`;
  document.querySelector("#detalle-cuidados").textContent = producto.cuidados;

  document.querySelector("#detalle-historia").textContent = producto.historia;
  document.querySelector("#detalle-historia-imagen").src = producto.imagen;
  document.querySelector("#detalle-historia-imagen").alt = `Detalle de fabricación de ${producto.nombre}`;

  document.querySelector("#detalle-producto").classList.remove("oculto");
  document.querySelector("#seccion-historia").classList.remove("oculto");
}

/** Renderiza las opciones de acabado de madera y maneja su selección. */
function pintarAcabados(producto) {
  const contenedor = document.querySelector("#acabados-opciones");
  contenedor.innerHTML = "";

  producto.acabados.forEach((acabado, indice) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "acabado" + (indice === 0 ? " seleccionado" : "");
    boton.innerHTML = `<span class="acabado__muestra" style="background-color:${acabado.hex}"></span>${acabado.nombre}`;

    boton.addEventListener("click", () => {
      contenedor.querySelectorAll(".acabado").forEach((b) => b.classList.remove("seleccionado"));
      boton.classList.add("seleccionado");
      acabadoSeleccionado = acabado.nombre;
    });

    contenedor.appendChild(boton);
  });

  acabadoSeleccionado = producto.acabados[0]?.nombre ?? null;
}

function configurarBotonAgregar(producto) {
  const boton = document.querySelector("#agregar-carrito");
  const mensajeExito = document.querySelector("#detalle-mensaje-exito");

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id, 1);

    mensajeExito.textContent = `¡${producto.nombre} (${acabadoSeleccionado}) agregado al carrito!`;
    mensajeExito.classList.remove("oculto");
    boton.disabled = true;
    boton.textContent = "Agregado ✓";

    setTimeout(() => {
      mensajeExito.classList.add("oculto");
      boton.disabled = false;
      boton.textContent = "Añadir Al Carrito";
    }, 2200);
  });
}

/** Crea una tarjeta de producto reducida para la grilla de complementarios. */
function crearTarjetaComplementaria(producto) {
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

/** Elige hasta 3 piezas complementarias: primero de la misma categoría. */
function elegirComplementarios(todos, productoActual) {
  const mismaCategoria = todos.filter(
    (p) => p.id !== productoActual.id && p.categoria === productoActual.categoria
  );
  const resto = todos.filter(
    (p) => p.id !== productoActual.id && p.categoria !== productoActual.categoria
  );
  return [...mismaCategoria, ...resto].slice(0, 3);
}

function pintarComplementarios(todos, productoActual) {
  const grilla = document.querySelector("#grilla-complementarios");
  const seccion = document.querySelector("#seccion-complementarios");
  const complementarios = elegirComplementarios(todos, productoActual);

  if (complementarios.length === 0) return;

  complementarios.forEach((producto) => grilla.appendChild(crearTarjetaComplementaria(producto)));
  seccion.classList.remove("oculto");
}

async function iniciarDetalle() {
  const cargando = document.querySelector("#detalle-cargando");
  const noEncontrado = document.querySelector("#detalle-no-encontrado");
  const id = obtenerIdDeUrl();

  try {
    const [productos, producto] = await Promise.all([
      obtenerProductos(),
      obtenerProductoPorId(id)
    ]);
    cargando.classList.add("oculto");

    if (!producto) {
      noEncontrado.classList.remove("oculto");
      return;
    }

    pintarProducto(producto);
    pintarAcabados(producto);
    configurarBotonAgregar(producto);
    pintarComplementarios(productos, producto);
  } catch (error) {
    cargando.textContent = "No se pudo cargar la pieza. Intentá de nuevo más tarde.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", iniciarDetalle);
