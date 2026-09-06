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

// Guarda cual de los tres acabados de madera eligio el usuario. Vive fuera de
// las funciones porque lo escribe pintarAcabados() y lo lee, mucho despues, el
// listener del boton "Anadir al carrito".
let acabadoSeleccionado = null;

/* El catalogo nos manda aca con un link tipo:  producto.html?id=3
   Esta funcion lee ese numero de la barra de direcciones.

   window.location.search es todo lo que va despues del signo de pregunta.
   URLSearchParams lo entiende y get("id") saca el valor.

   OJO: lo que devuelve es TEXTO, el string "3" y no el numero 3. La
   conversion a numero la hace obtenerProductoPorId() en js/api.js con
   Number(id). Sin esa conversion, comparar "3" === 3 daria false y nunca
   se encontraria ningun producto. */
function obtenerIdDeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

/* Vuelca los datos del producto en los huecos que ya existen en el HTML.

   Fijate la diferencia con el catalogo: aca NO creamos etiquetas nuevas. El
   producto.html ya tiene todos los elementos escritos y vacios, y nosotros
   solo les cambiamos el contenido con textContent. Por eso hay una linea por
   cada dato en vez de un innerHTML grande. */
function pintarProducto(producto) {
  // Tambien cambiamos el titulo de la pestana del navegador.
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

  // Las dos secciones arrancan con la clase "oculto" en el HTML. Recien ahora,
  // con los datos ya puestos, las mostramos. Asi el usuario nunca ve los
  // huecos vacios mientras carga.
  document.querySelector("#detalle-producto").classList.remove("oculto");
  document.querySelector("#seccion-historia").classList.remove("oculto");
}

/* Dibuja los botones de acabado de madera (Nogal / Roble / Cerezo) y maneja
   cual queda marcado. Los tres acabados salen del array ACABADOS de data.js. */
function pintarAcabados(producto) {
  const contenedor = document.querySelector("#acabados-opciones");
  contenedor.innerHTML = ""; // por si se vuelve a llamar, no duplicar botones

  // forEach puede recibir un segundo parametro con la POSICION del elemento.
  // Lo usamos abajo para marcar el primero por defecto.
  producto.acabados.forEach((acabado, indice) => {
    const boton = document.createElement("button");

    // type="button" es importante: sin esto, un <button> dentro de un form
    // intentaria enviarlo al hacer click.
    boton.type = "button";

    // El operador ternario: si indice es 0 (el primero) le suma la clase
    // " seleccionado", si no le suma nada. Es un if corto escrito en una linea.
    boton.className = "acabado" + (indice === 0 ? " seleccionado" : "");
    boton.innerHTML = `<span class="acabado__muestra" style="background-color:${acabado.hex}"></span>${acabado.nombre}`;

    boton.addEventListener("click", () => {
      // Mismo patron que las pills del catalogo: se la sacamos a todos y se la
      // ponemos solo al clickeado, para que quede uno solo marcado.
      contenedor.querySelectorAll(".acabado").forEach((b) => b.classList.remove("seleccionado"));
      boton.classList.add("seleccionado");
      acabadoSeleccionado = acabado.nombre;
    });

    contenedor.appendChild(boton);
  });

  // Dejamos el primer acabado como elegido por defecto, para que coincida con
  // el boton que quedo marcado arriba.
  //
  // El signo de pregunta despues de [0] evita el error si el array estuviera
  // vacio, y los dos signos de pregunta ponen null en ese caso.
  acabadoSeleccionado = producto.acabados[0]?.nombre ?? null;
}

/* Engancha el boton "Anadir Al Carrito" y le da feedback visual al usuario. */
function configurarBotonAgregar(producto) {
  const boton = document.querySelector("#agregar-carrito");
  const mensajeExito = document.querySelector("#detalle-mensaje-exito");

  boton.addEventListener("click", () => {
    // agregarAlCarrito vive en js/cart.js y espera el ID, no el objeto entero.
    // Esa funcion se encarga sola de guardar en localStorage y de actualizar
    // el numerito del header.
    agregarAlCarrito(producto.id, 1);

    mensajeExito.textContent = `¡${producto.nombre} (${acabadoSeleccionado}) agregado al carrito!`;
    mensajeExito.classList.remove("oculto");
    boton.disabled = true;
    boton.textContent = "Agregado ✓";

    // Despues de 2,2 segundos deshacemos todo el feedback y el boton vuelve a
    // estar disponible. setTimeout programa que esto corra mas tarde, sin
    // frenar nada mientras tanto.
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

/* Elige hasta 3 piezas para recomendar abajo del producto.

   La idea: primero las de la MISMA categoria (si estas viendo un sillon,
   mostrarte otros sillones), y si no alcanzan, rellenar con el resto.

   Los dos filter() usan "p.id !== productoActual.id" para no recomendarte el
   mismo mueble que ya estas mirando.

   Despues los tres puntos pegan las dos listas en una sola, en ese orden, y
   slice(0, 3) se queda con las primeras tres. */
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
    // Necesitamos dos cosas: el producto que se esta viendo, y la lista
    // completa para elegir los recomendados.
    //
    // Promise.all lanza las dos peticiones AL MISMO TIEMPO y espera a que
    // terminen las dos. Como cada una tarda 700 ms, hacerlas en paralelo
    // tarda 700 ms en total; una despues de la otra tardaria 1400 ms.
    const [productos, producto] = await Promise.all([
      obtenerProductos(),
      obtenerProductoPorId(id)
    ]);
    cargando.classList.add("oculto");

    // Si entraron sin ?id, o con un id que no existe, obtenerProductoPorId
    // devuelve undefined. Mostramos el cartel de "no encontrado" y cortamos.
    if (!producto) {
      noEncontrado.classList.remove("oculto");
      return;
    }

    // El orden aca no es casual: primero los datos, despues los acabados
    // (que dejan uno seleccionado), despues el boton (que lee ese acabado)
    // y al final los recomendados.
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
