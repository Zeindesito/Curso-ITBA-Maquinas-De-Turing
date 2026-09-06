# Hermanos Jota — E-commerce (Sprint 1 y 2)

Sitio web front-end de un e-commerce de mobiliario de autor, desarrollado
como consigna académica y basado en el diseño de Figma del equipo. Simula
una experiencia de compra completa **sin conexión a backend**: los
productos se gestionan localmente con JavaScript.

### Adaptaciones respecto al Figma original

El Figma de referencia incluía nombres de producto, fotografía de estilo de
vida (living decorado) y varias fotos por producto que no forman parte del
kit de imágenes real entregado para el proyecto. Para que el sitio funcione
con datos reales se hicieron estos ajustes, manteniendo la identidad visual,
la tipografía, la paleta de colores y la estructura de página a página:

- Se usaron los 11 productos y nombres del kit de imágenes real (en vez de
  los nombres de ejemplo del Figma), con precios en pesos argentinos (ARS)
  como en la página de catálogo del Figma.
- Cada producto tiene una sola foto (recorte de producto), por lo que la
  página de detalle no incluye la tira de miniaturas con fotos de ángulos
  distintos que sí aparecía en el Figma.
- Las secciones que en el Figma usaban fotos de ambiente/artesanos (hero,
  "Donde la madera vuelve a respirar") reutilizan las fotos de producto
  disponibles con un tratamiento de color, ya que no se contaba con esa
  fotografía de estilo de vida.
- Las categorías "Iluminación" y "Accesorios" del filtro del catálogo se
  mantienen visualmente (tal como en el Figma) pero hoy no tienen productos
  cargados, porque el kit de imágenes no incluye piezas de esos rubros.

## Integrantes del equipo

- Nombre Apellido — usuario de GitHub
- Nombre Apellido — usuario de GitHub
- Nombre Apellido — usuario de GitHub
- Nombre Apellido — usuario de GitHub
- Nombre Apellido — usuario de GitHub

> Reemplazar por los datos reales del equipo antes de la entrega.

## Descripción del proyecto

El sitio cuenta con 4 páginas:

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Hero, cita/manifiesto, 4 piezas destacadas cargadas dinámicamente, sección de sustentabilidad y formulario de consulta. |
| Colección (catálogo) | `productos.html` | Grilla completa de productos con filtro por categoría (pills), filtros de material/estilo/precio, buscador y paginación "Cargar más". |
| Detalle de producto | `producto.html` | Imagen, descripción, selector de acabado de madera, ficha técnica, historia del producto y piezas complementarias recomendadas. |
| Contacto | `contacto.html` | Formulario (nombre, email, mensaje) con validación del lado del cliente. |

## Funcionalidad

- Catálogo de productos definido como **array de objetos** (`js/data.js`),
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

## Cómo correrlo localmente

No requiere instalación de dependencias. Alcanza con abrir `index.html` en el
navegador, o levantar un servidor estático simple, por ejemplo:

```bash
# Con Python 3
python3 -m http.server 8000

# Con la extensión Live Server de VS Code
# Clic derecho sobre index.html > "Open with Live Server"
```

Luego entrar a `http://localhost:8000`.

## Despliegue

El sitio está pensado para desplegarse en un servicio de hosting estático
gratuito (GitHub Pages, Netlify o Vercel), ya que no depende de ningún
backend.

Para GitHub Pages: `Settings` → `Pages` → `Branch: main` → carpeta `/root`.

## Flujo de trabajo con Git

- Cada integrante trabaja en una rama propia (`feature/nombre-seccion`) y
  abre un Pull Request hacia `main`.
- Se recomienda hacer commits chicos y descriptivos (`feat:`, `fix:`,
  `style:`, `docs:`) para reflejar el aporte de cada integrante en el
  historial.
