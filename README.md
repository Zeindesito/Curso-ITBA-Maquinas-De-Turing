# Hermanos Jota — E-commerce (Sprint 1 y 2)

## Integrantes del equipo

- Matias Joel Gonzalez — Zeindesito
- Dominguez del Barco Abril — Abril-delBarco
- Ortega Minardi Martin Eduardo — MartinOrtega3RL
- Matias Ismael Alegret — MatiasIsmaelA
- Lautaro Ardizzi — Lauchax12

## Descripción del proyecto

El sitio cuenta con 4 páginas:

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Hero, cita/manifiesto, 4 piezas destacadas cargadas dinámicamente, sección de sustentabilidad y formulario de consulta. |
| Colección (catálogo) | `productos.html` | Grilla completa de productos con filtro por categoría (pills), filtros de material/estilo/precio, buscador y paginación "Cargar más". |
| Detalle de producto | `producto.html` | Imagen, descripción, selector de acabado de madera, ficha técnica, historia del producto y piezas complementarias recomendadas. |
| Contacto | `contacto.html` | Formulario (nombre, email, mensaje) con validación del lado del cliente. |

## Funcionalidad

- Catálogo de productos (`js/data.js`),
  con dimensiones, materiales, peso, cuidados, acabados e historia por pieza.
- **Carga asíncrona simulada** del catálogo mediante `Promise` + `setTimeout`,
  consumida con `async/await` (`js/api.js`).
- **Renderizado dinámico** de las tarjetas de producto manipulando el DOM
  (`createElement`, `innerHTML`, `appendChild`).
- **Carrito de compras simulado**, persistido en `localStorage`, con contador
  en el header y mini-carrito desplegable (`js/cart.js`).
- **Filtros combinables** en el catálogo: categoría, material, estilo, rango
  de precio y buscador de texto, todos con `addEventListener`.
- **Paginación "Cargar más productos"** que simula una nueva petición async
  antes de mostrar el siguiente grupo de piezas.
- **Selector de acabado de madera** interactivo en el detalle de producto.
- **Piezas complementarias recomendadas**, calculadas dinámicamente según la
  categoría del producto que se está viendo.
- **Formulario de contacto** (reutilizado en Inicio y en Contacto) con
  validación en JavaScript (nombre, formato de email y longitud del mensaje)
  y mensaje de éxito mediante el DOM.
- **Diseño 100% responsive**, mobile first, con Flexbox para las secciones
  principales y media queries para tablet (≥600px) y desktop (≥900px).
- Menú de navegación adaptado a mobile (hamburguesa) mediante
  `addEventListener`.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (Flexbox, variables CSS, mobile first)
- JavaScript (ES6+, DOM, Fetch/Promises simuladas, async/await, eventos,
  localStorage)
- Git y GitHub para el trabajo colaborativo

## Estructura del proyecto

```
muebleria-hermanos-jota/
├── index.html
├── productos.html
├── producto.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js        # Array de objetos con el catálogo
│   ├── api.js          # Simulación de petición async (Promise + setTimeout)
│   ├── cart.js          # Lógica del carrito (localStorage) y del header
│   ├── home.js          # Lógica de index.html (destacados)
│   ├── catalogo.js      # Lógica de productos.html (filtros + paginación)
│   ├── detalle.js       # Lógica de producto.html (detalle + complementarios)
│   └── contacto.js      # Validación de formularios (Inicio y Contacto)
└── assets/
    └── img/            # Imágenes de los productos y logo
```
