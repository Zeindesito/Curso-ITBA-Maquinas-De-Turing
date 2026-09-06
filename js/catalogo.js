/**
 * catalogo.js
 * -----------------------------------------------------------------------
 * Lógica exclusiva de productos.html:
 *  - Trae todos los productos (petición simulada async/await).
 *  - Los renderiza dinámicamente en el DOM.
 *  - Filtra por categoría (pills), material, estilo, rango de precio y
 *    buscador de texto — todo en memoria, con addEventListener.
 *  - Pagina con un botón "Cargar Más Productos" (simula carga async).
 * -----------------------------------------------------------------------
 */

const PRODUCTOS_POR_PAGINA = 6;

let productosCargados = [];
let productosVisibles = PRODUCTOS_POR_PAGINA;

const filtros = {
  categoria: "Todos",
  material: "",
  estilo: "",
  precio: "",
  busqueda: ""
};

function crearTarjetaCatalogo(producto) {
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

/** Aplica todos los filtros activos sobre el catálogo completo. */
function obtenerProductosFiltrados() {
  return productosCargados.filter((producto) => {
    if (filtros.categoria !== "Todos" && producto.categoria !== filtros.categoria) {
      return false;
    }
    if (filtros.material && producto.materialPrincipal !== filtros.material) {
      return false;
    }
    if (filtros.estilo && producto.estilo !== filtros.estilo) {
      return false;
    }
    if (filtros.precio) {
      const [min, max] = filtros.precio.split("-").map(Number);
      if (producto.precio < min || producto.precio > max) {
        return false;
      }
    }
    if (filtros.busqueda) {
      const termino = filtros.busqueda.toLowerCase();
      const coincide =
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino);
      if (!coincide) return false;
    }
    return true;
  });
}

function renderizarCatalogo() {
  const grilla = document.querySelector("#grilla-catalogo");
  const mensajeVacio = document.querySelector("#catalogo-vacio");
  const conteo = document.querySelector("#conteo-productos");
  const contenedorCargarMas = document.querySelector("#contenedor-cargar-mas");

  const filtrados = obtenerProductosFiltrados();
  conteo.textContent = filtrados.length;

  grilla.innerHTML = "";

  if (filtrados.length === 0) {
    mensajeVacio.classList.remove("oculto");
    contenedorCargarMas.classList.add("oculto");
    return;
  }

  mensajeVacio.classList.add("oculto");

  const visibles = filtrados.slice(0, productosVisibles);
  visibles.forEach((producto) => grilla.appendChild(crearTarjetaCatalogo(producto)));

  contenedorCargarMas.classList.toggle("oculto", productosVisibles >= filtrados.length);
}

/** Carga las opciones únicas de material y estilo en los <select>. */
function poblarFiltrosAvanzados() {
  const selectMaterial = document.querySelector("#filtro-material");
  const selectEstilo = document.querySelector("#filtro-estilo");

  const materiales = [...new Set(productosCargados.map((p) => p.materialPrincipal))].sort();
  const estilos = [...new Set(productosCargados.map((p) => p.estilo))].sort();

  materiales.forEach((material) => {
    const opcion = document.createElement("option");
    opcion.value = material;
    opcion.textContent = material;
    selectMaterial.appendChild(opcion);
  });

  estilos.forEach((estilo) => {
    const opcion = document.createElement("option");
    opcion.value = estilo;
    opcion.textContent = estilo;
    selectEstilo.appendChild(opcion);
  });
}

function reiniciarPaginacionYRenderizar() {
  productosVisibles = PRODUCTOS_POR_PAGINA;
  renderizarCatalogo();
}

function configurarFiltros() {
  // Pills de categoría
  document.querySelectorAll(".filtro-categorias__pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filtro-categorias__pill").forEach((p) => p.classList.remove("activo"));
      pill.classList.add("activo");
      filtros.categoria = pill.dataset.categoria;
      reiniciarPaginacionYRenderizar();
    });
  });

  document.querySelector("#filtro-material").addEventListener("change", (evento) => {
    filtros.material = evento.target.value;
    reiniciarPaginacionYRenderizar();
  });

  document.querySelector("#filtro-estilo").addEventListener("change", (evento) => {
    filtros.estilo = evento.target.value;
    reiniciarPaginacionYRenderizar();
  });

  document.querySelector("#filtro-precio").addEventListener("change", (evento) => {
    filtros.precio = evento.target.value;
    reiniciarPaginacionYRenderizar();
  });

  document.querySelector("#buscador-productos").addEventListener("input", (evento) => {
    filtros.busqueda = evento.target.value;
    reiniciarPaginacionYRenderizar();
  });

  document.querySelector("#boton-cargar-mas").addEventListener("click", async (evento) => {
    const boton = evento.target;
    boton.disabled = true;
    boton.textContent = "Cargando...";

    await new Promise((resolve) => setTimeout(resolve, 500)); // simula carga async

    productosVisibles += PRODUCTOS_POR_PAGINA;
    renderizarCatalogo();

    boton.disabled = false;
    boton.textContent = "Cargar Más Productos";
  });
}

async function iniciarCatalogo() {
  const cargando = document.querySelector("#catalogo-cargando");

  try {
    productosCargados = await obtenerProductos(); // petición simulada
    cargando.classList.add("oculto");
    poblarFiltrosAvanzados();
    configurarFiltros();
    renderizarCatalogo();
  } catch (error) {
    cargando.textContent = "No se pudo cargar la colección. Intentá de nuevo más tarde.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
