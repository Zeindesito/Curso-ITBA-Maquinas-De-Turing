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

/* ---------- ESTADO DE LA PAGINA ----------
   Estas variables viven fuera de las funciones a proposito: son la "memoria"
   del catalogo. Cualquier funcion de abajo puede leerlas y modificarlas, y
   todas ven siempre el mismo valor actualizado. */

// De a cuantos productos mostramos por vez (el boton "Cargar mas" suma otros 6).
const PRODUCTOS_POR_PAGINA = 6;

// Aca guardamos los 11 productos una vez que llegan de la peticion simulada.
// Arranca vacio porque todavia no pedimos nada.
let productosCargados = [];

// Cuantos estamos mostrando ahora mismo. Sube al apretar "Cargar mas" y
// vuelve a 6 cada vez que se cambia un filtro.
let productosVisibles = PRODUCTOS_POR_PAGINA;

// Un solo objeto con TODOS los filtros activos. Guardarlos juntos permite
// que obtenerProductosFiltrados() los aplique de una pasada, en vez de tener
// cinco variables sueltas dando vueltas.
// El string vacio "" significa "este filtro no esta puesto".
const filtros = {
  categoria: "Todos",
  material: "",
  estilo: "",
  precio: "",
  busqueda: ""
};

/* Recibe UN producto y devuelve el <article> ya armado, pero todavia sin
   insertar en la pagina. Quien lo inserta es renderizarCatalogo(). */
function crearTarjetaCatalogo(producto) {
  // createElement crea la etiqueta en memoria: todavia no esta en el HTML.
  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto";

  // Las comillas invertidas permiten escribir HTML en varias lineas e
  // insertar valores con la sintaxis de dolar y llaves. Cada uno de esos
  // huecos se reemplaza por el dato real del producto.
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

/* Aplica TODOS los filtros activos de una pasada y devuelve una lista nueva.
   No toca productosCargados: filter() siempre crea un array aparte, y por eso
   al borrar el buscador vuelven a aparecer los 11.

   La logica de adentro es: cada if busca un motivo para DESCARTAR el producto.
   Si encuentra uno, corta con "return false" y ni siquiera evalua los filtros
   siguientes. Si sobrevive a todos los if, llega al "return true" del final
   y entra en la lista. */
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
      // El <select> guarda los rangos como texto, por ejemplo "10000-25000".
      // split("-") lo parte en dos pedazos, map(Number) los convierte a
      // numeros, y [min, max] reparte cada uno en su propia variable.
      const [min, max] = filtros.precio.split("-").map(Number);
      if (producto.precio < min || producto.precio > max) {
        return false;
      }
    }
    if (filtros.busqueda) {
      // toLowerCase en los DOS lados de la comparacion: asi escribir "SOFA"
      // tambien encuentra "Sofa". Si solo lo hicieramos de un lado, nunca
      // coincidirian.
      const termino = filtros.busqueda.toLowerCase();
      const coincide =
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino);
      if (!coincide) return false;
    }
    return true;
  });
}

/* Dibuja la grilla en pantalla. Se llama cada vez que cambia algo: al cargar
   la pagina, al tocar cualquier filtro y al apretar "Cargar mas". */
function renderizarCatalogo() {
  const grilla = document.querySelector("#grilla-catalogo");
  const mensajeVacio = document.querySelector("#catalogo-vacio");
  const conteo = document.querySelector("#conteo-productos");
  const contenedorCargarMas = document.querySelector("#contenedor-cargar-mas");

  const filtrados = obtenerProductosFiltrados();
  conteo.textContent = filtrados.length;

  // Vaciamos la grilla antes de dibujar. Sin esta linea, cada vez que
  // escribieras una letra en el buscador se apilarian tarjetas nuevas encima
  // de las viejas.
  grilla.innerHTML = "";

  // Caso "no hay resultados": mostramos el cartel, escondemos el boton de
  // cargar mas y cortamos con return para no dibujar nada.
  if (filtrados.length === 0) {
    mensajeVacio.classList.remove("oculto");
    contenedorCargarMas.classList.add("oculto");
    return;
  }

  mensajeVacio.classList.add("oculto");

  // slice(0, N) corta los primeros N de la lista filtrada. Aca esta toda la
  // paginacion: los productos existen todos, pero solo dibujamos un pedazo.
  const visibles = filtrados.slice(0, productosVisibles);
  visibles.forEach((producto) => grilla.appendChild(crearTarjetaCatalogo(producto)));

  // toggle con un segundo argumento agrega la clase si es true y la saca si es
  // false. Traducido: escondemos "Cargar mas" cuando ya no queda nada por
  // mostrar, y lo dejamos visible si todavia sobran productos.
  contenedorCargarMas.classList.toggle("oculto", productosVisibles >= filtrados.length);
}

/** Carga las opciones únicas de material y estilo en los <select>. */
function poblarFiltrosAvanzados() {
  const selectMaterial = document.querySelector("#filtro-material");
  const selectEstilo = document.querySelector("#filtro-estilo");

  // Los <select> de material y estilo NO estan escritos en el HTML: se arman
  // solos leyendo el catalogo. Si manana agregan un mueble de un material
  // nuevo, la opcion aparece sola.
  //
  // Como funciona la linea: map() saca el material de cada producto y deja una
  // lista con repetidos; new Set() elimina los duplicados; los tres puntos
  // vuelven a convertir ese Set en array; y sort() los ordena alfabeticamente.
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

/* Cada vez que se toca un filtro hay que volver a la primera pagina. Si no,
   filtrabas con 12 productos visibles, quedaban 3 resultados, y la cuenta
   seguia creida de que estaba mostrando 12. */
function reiniciarPaginacionYRenderizar() {
  productosVisibles = PRODUCTOS_POR_PAGINA;
  renderizarCatalogo();
}

/* Engancha un addEventListener a cada control de la pagina. Se llama UNA sola
   vez, al iniciar; de ahi en mas los listeners quedan escuchando solos.

   Fijate el patron que se repite en los cinco: guardar el valor nuevo en el
   objeto "filtros" y volver a dibujar. La logica de filtrado no esta aca,
   esta en obtenerProductosFiltrados(). */
function configurarFiltros() {
  // --- Pills de categoria (Todos / Sillones / Mesas / ...) ---
  document.querySelectorAll(".filtro-categorias__pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      // Primero le sacamos "activo" a TODAS y despues se la ponemos solo a la
      // clickeada. Es la forma tipica de que quede una sola marcada.
      document.querySelectorAll(".filtro-categorias__pill").forEach((p) => p.classList.remove("activo"));
      pill.classList.add("activo");

      // dataset.categoria lee el atributo data-categoria del HTML. Asi el
      // boton mismo carga el valor que hay que filtrar.
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

  // El evento "input" se dispara con CADA tecla, incluido el borrar. Por eso
  // el buscador filtra mientras escribis, sin apretar enter ni ningun boton.
  document.querySelector("#buscador-productos").addEventListener("input", (evento) => {
    filtros.busqueda = evento.target.value;
    reiniciarPaginacionYRenderizar();
  });

  // --- Boton "Cargar mas" ---
  document.querySelector("#boton-cargar-mas").addEventListener("click", async (evento) => {
    const boton = evento.target;

    // Deshabilitamos el boton mientras "carga", para que no se pueda clickear
    // cinco veces seguidas y saltearse paginas.
    boton.disabled = true;
    boton.textContent = "Cargando...";

    // Medio segundo de espera falsa, para que se note que algo pasa.
    // await frena la funcion aca hasta que la promesa termine.
    await new Promise((resolve) => setTimeout(resolve, 500));

    // += suma sin pisar: si mostrabamos 6, ahora mostramos 12.
    productosVisibles += PRODUCTOS_POR_PAGINA;
    renderizarCatalogo();

    boton.disabled = false;
    boton.textContent = "Cargar Más Productos";
  });
}

/* Punto de entrada de la pagina. El orden importa: primero traemos los datos,
   y recien despues armamos los filtros (que necesitan los datos para saber que
   opciones existen) y dibujamos. */
async function iniciarCatalogo() {
  const cargando = document.querySelector("#catalogo-cargando");

  try {
    // await frena la funcion hasta que obtenerProductos() (js/api.js) devuelva
    // el array. Mientras tanto la pagina no se congela: el usuario puede
    // scrollear, y por eso se alcanza a ver el cartel de "Cargando".
    productosCargados = await obtenerProductos();

    cargando.classList.add("oculto"); // llegaron los datos, fuera el cartel
    poblarFiltrosAvanzados();         // llena los <select> con los datos
    configurarFiltros();              // engancha los addEventListener
    renderizarCatalogo();             // dibuja las primeras 6 tarjetas
  } catch (error) {
    // Si la promesa falla, await lanza el error y caemos aca. En este proyecto
    // no puede fallar porque los datos son locales, pero es la forma correcta
    // de escribirlo para cuando sea un fetch de verdad.
    cargando.textContent = "No se pudo cargar la colección. Intentá de nuevo más tarde.";
    console.error(error);
  }
}

// DOMContentLoaded se dispara cuando el HTML termino de armarse. Sin esto, el
// script podria buscar #grilla-catalogo antes de que exista y recibir null.
document.addEventListener("DOMContentLoaded", iniciarCatalogo);
