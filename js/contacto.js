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

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Muestra un error debajo del campo indicado dentro de un formulario. */
function mostrarError(form, nombreCampo, mensaje) {
  const campo = form.querySelector(`#campo-${nombreCampo}`);
  const error = form.querySelector(`#error-${nombreCampo}`);
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
