/**
 * contacto.js
 * -----------------------------------------------------------------------
 * Valida los formularios de consulta/contacto del lado del cliente
 * (sin backend) y muestra los resultados manipulando el DOM.
 * Es genérico: funciona tanto para el formulario del home ("Diseñemos
 * tu espacio de paz") como para el de contacto.html, porque busca
 * cualquier <form class="form-consulta"> presente en la página.
 * -----------------------------------------------------------------------
 */

/* Una expresion regular es un patron para validar texto. Leida en partes:

     ^            arranca aca
     [^\s@]+      uno o mas caracteres que NO sean espacio ni arroba
     @            una arroba
     [^\s@]+      otra vez, uno o mas que no sean espacio ni arroba
     \.           un punto literal (la barra invertida lo escapa)
     [^\s@]+      lo mismo, para el "com"
     $            termina aca

   O sea: algo + arroba + algo + punto + algo, sin espacios. Es la validacion
   minima razonable de un email. */
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Muestra un error debajo del campo indicado dentro de un formulario. */
/* Marca un campo como invalido y escribe el mensaje debajo.

   Arma los selectores concatenando: si le pasas "email", busca #campo-email
   y #error-email. Por eso el HTML tiene que respetar esos nombres de id. */
function mostrarError(form, nombreCampo, mensaje) {
  const campo = form.querySelector(`#campo-${nombreCampo}`);
  const error = form.querySelector(`#error-${nombreCampo}`);

  // Si el HTML no tiene esos huecos, cortamos en vez de reventar.
  if (!campo || !error) return;
  campo.classList.add("campo--error");
  error.textContent = mensaje;
}

/** Limpia el error de un campo dentro de un formulario. */
function limpiarError(form, nombreCampo) {
  const campo = form.querySelector(`#campo-${nombreCampo}`);
  const error = form.querySelector(`#error-${nombreCampo}`);
  if (!campo || !error) return;
  campo.classList.remove("campo--error");
  error.textContent = "";
}

/**
 * Valida los tres campos del formulario.
 * @returns {boolean} true si todo es válido.
 */
/* Valida los tres campos y devuelve true solo si estan todos bien.

   Detalle de diseno importante: NO corta en el primer error. La variable
   esValido se pone en false pero la funcion sigue revisando los demas campos,
   asi el usuario ve TODOS los errores de una vez en vez de descubrirlos de a
   uno cada vez que aprieta enviar.

   trim() saca los espacios de los bordes: asi tres espacios no cuentan como
   un nombre valido. */
function validarFormulario(form, datos) {
  let esValido = true;

  if (datos.nombre.trim().length < 3) {
    mostrarError(form, "nombre", "Ingresá tu nombre completo (mínimo 3 caracteres).");
    esValido = false;
  } else {
    limpiarError(form, "nombre");
  }

  if (!REGEX_EMAIL.test(datos.email.trim())) {
    mostrarError(form, "email", "Ingresá un email válido (ej: nombre@email.com).");
    esValido = false;
  } else {
    limpiarError(form, "email");
  }

  if (datos.mensaje.trim().length < 10) {
    mostrarError(form, "mensaje", "Contanos un poco más (mínimo 10 caracteres).");
    esValido = false;
  } else {
    limpiarError(form, "mensaje");
  }

  return esValido;
}

/** Simula el envío del formulario a un servidor. */
function enviarFormularioSimulado(datos) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, datos }), 600);
  });
}

function configurarFormulario(form) {
  const mensajeExito = form.querySelector(".mensaje-exito");
  const botonEnviar = form.querySelector("button[type='submit']");
  const textoOriginalBoton = botonEnviar ? botonEnviar.textContent : "";

  form.addEventListener("submit", async (evento) => {
    // preventDefault frena el comportamiento por defecto del formulario, que
    // seria recargar la pagina y mandar los datos a un servidor. Como no hay
    // backend, nos quedamos manejando todo con JavaScript.
    evento.preventDefault();

    const datos = {
      nombre: form.querySelector("#nombre").value,
      email: form.querySelector("#email").value,
      mensaje: form.querySelector("#mensaje").value
    };

    if (!validarFormulario(form, datos)) {
      if (mensajeExito) mensajeExito.classList.add("oculto");
      return;
    }

    if (botonEnviar) {
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";
    }

    await enviarFormularioSimulado(datos);

    if (botonEnviar) {
      botonEnviar.disabled = false;
      botonEnviar.textContent = textoOriginalBoton;
    }
    if (mensajeExito) mensajeExito.classList.remove("oculto");
    form.reset();
  });

  // Limpia el error de un campo apenas el usuario empieza a corregirlo.
  ["nombre", "email", "mensaje"].forEach((nombreCampo) => {
    const input = form.querySelector(`#${nombreCampo}`);
    if (input) {
      input.addEventListener("input", () => limpiarError(form, nombreCampo));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".form-consulta").forEach(configurarFormulario);
});
