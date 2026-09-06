/**
 * data.js
 * -----------------------------------------------------------------------
 * Catálogo de productos de Hermanos Jota.
 * Es un array de objetos: cada objeto representa un mueble.
 * Este archivo NO tiene lógica, solo los datos (simula lo que normalmente
 * vendría de un backend / base de datos).
 * -----------------------------------------------------------------------
 */

/** Acabados de madera disponibles (compartidos por todo el catálogo). */
const ACABADOS = [
  { nombre: "Nogal Natural", hex: "#4a3527" },
  { nombre: "Roble Claro", hex: "#c9a876" },
  { nombre: "Cerezo Oscuro", hex: "#6b2f28" }
];

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Sofá Patagonia",
    categoria: "Sillones",
    estilo: "Mediados de Siglo",
    materialPrincipal: "Guindo",
    precio: 38900,
    imagen: "assets/sofa-patagonia.png",
    descripcionCorta: "Líneas curvas inspiradas en el optimismo de los 60. Estructura de guindo macizo y tapizado en boucle.",
    descripcionLarga:
      "Inspirado en el optimismo perdurable del diseño de mediados de siglo, el Sofá Patagonia fue moldeado con un respeto absoluto por la ecología actual. Sus almohadones desmontables y su estructura de guindo macizo abrazan el cuerpo de manera ergonómica, celebrando el espacio interior.",
    historia:
      "Cada Sofá Patagonia nace de vigas de guindo recuperadas de bosques ya talados. Nuestros talladores respetan la fibra original de la madera, dejando que sus vetas cuenten la historia de un árbol que vivió generaciones antes de convertirse en el punto de encuentro de tu living.",
    dimensiones: "80 cm alto x 90 cm ancho x 210 cm largo",
    materiales: "Guindo macizo, tapizado en boucle",
    peso: 62,
    cuidados: "Aspirar el tapizado regularmente. Limpiar manchas con paño húmedo y jabón neutro.",
    acabados: ACABADOS,
    destacado: true
  },
  {
    id: 2,
    nombre: "Sillón Copacabana",
    categoria: "Sillones",
    estilo: "Mediados de Siglo",
    materialPrincipal: "Cedro",
    precio: 24500,
    imagen: "assets/sillon-copacabana.png",
    descripcionCorta: "Sillón reclinable de líneas curvas, inspirado en el diseño brasileño de mediados de siglo.",
    descripcionLarga:
      "El Sillón Copacabana ofrece un respaldo curvo y un mecanismo de reclinado suave, moldeado a mano en cedro macizo. Una silueta orgánica pensada para sumar una butaca de lectura con personalidad propia a cualquier ambiente.",
    historia:
      "El Copacabana rinde homenaje a los talleres cariocas de los años 50. Cada curva se tallada pacientemente a mano, capa por capa, hasta lograr un respaldo que acompaña la espalda con la misma naturalidad que una hamaca.",
    dimensiones: "95 cm alto x 85 cm ancho x 88 cm prof.",
    materiales: "Cedro macizo, tapizado en pana",
    peso: 22,
    cuidados: "Aspirar el tapizado regularmente. Limpiar manchas con paño húmedo y jabón neutro.",
    acabados: ACABADOS,
    destacado: true
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    categoria: "Sillones",
    estilo: "Clásico Atemporal",
    materialPrincipal: "Algarrobo",
    precio: 16800,
    imagen: "assets/butaca-mendoza.png",
    descripcionCorta: "Butaca tapizada en lino natural, con patas de algarrobo torneadas a mano.",
    descripcionLarga:
      "La Butaca Mendoza suma calidez a cualquier ambiente gracias a su tapizado en lino y sus patas de algarrobo torneadas a mano. Un clásico atemporal, liviano y fácil de mover entre ambientes, sin sacrificar carácter.",
    historia:
      "Trabajamos el algarrobo de segunda vida — vigas de antiguos corrales de la región de Cuyo — porque su veta densa envejece con dignidad. Cada butaca lleva pequeñas marcas naturales de su vida anterior; no son defectos, son memoria.",
    dimensiones: "80 cm alto x 72 cm ancho x 75 cm prof.",
    materiales: "Algarrobo macizo, tapizado en lino natural",
    peso: 14,
    cuidados: "Aspirar el tapizado regularmente. Limpiar manchas con paño húmedo y jabón neutro.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 4,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Mesas",
    estilo: "Rústico",
    materialPrincipal: "Araucaria",
    precio: 11200,
    imagen: "assets/mesa-de-centro-araucaria.png",
    descripcionCorta: "Mesa ratona baja tallada en un solo tronco de araucaria maciza.",
    descripcionLarga:
      "Fabricada en madera de araucaria maciza, esta mesa de centro tiene un diseño bajo y liviano visualmente, pensado para acompañar sofás y sillones sin sobrecargar el espacio. Cada pieza conserva la silueta natural del tronco original.",
    historia:
      "La araucaria que usamos proviene de ejemplares caídos naturalmente por tormentas en la cordillera. En vez de descartarla, la rescatamos y dejamos que su forma irregular guíe el diseño final de cada mesa: ninguna pieza sale idéntica a otra.",
    dimensiones: "38 cm alto x 110 cm ancho x 60 cm prof.",
    materiales: "Araucaria maciza, terminación natural",
    peso: 18,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 5,
    nombre: "Mesa Comedor Pampa",
    categoria: "Mesas",
    estilo: "Contemporáneo",
    materialPrincipal: "Nogal",
    precio: 34900,
    imagen: "assets/mesa-comedor-pampa.png",
    descripcionCorta: "Mesa de comedor para 6 personas, en nogal macizo con patas escultóricas en V.",
    descripcionLarga:
      "Un tributo a la imperfección de la naturaleza: la Mesa Comedor Pampa está construida en nogal macizo, con patas en forma de V que aportan estabilidad y un perfil escultural. Pensada para 6 comensales, es la protagonista de cualquier comedor.",
    historia:
      "Seleccionamos tablones de nogal con vetas pronunciadas a propósito: preferimos que la madera muestre su carácter antes que ocultarlo bajo terminaciones uniformes. Cada mesa se ensambla sin tornillos visibles, usando ensambles tradicionales de carpintería.",
    dimensiones: "75 cm alto x 180 cm ancho x 95 cm prof.",
    materiales: "Nogal macizo",
    peso: 48,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: true
  },
  {
    id: 6,
    nombre: "Sillas Córdoba",
    categoria: "Sillones",
    estilo: "Minimalista",
    materialPrincipal: "Haya",
    precio: 7600,
    imagen: "assets/sillas-cordoba.png",
    descripcionCorta: "Sillas de comedor apilables, estructura de haya curvada (precio por unidad).",
    descripcionLarga:
      "Las Sillas Córdoba tienen estructura de madera curvada y asiento tapizado, diseñadas para combinar con cualquier mesa de comedor. Livianas, resistentes y apilables para facilitar su guardado en espacios reducidos.",
    historia:
      "Aprendimos la técnica de curvado al vapor de un taller centenario en Córdoba. El proceso lleva días: la madera se humedece, se dobla lentamente sobre un molde y se deja secar bajo tensión hasta fijar su nueva forma, sin cortar ni forzar la fibra.",
    dimensiones: "82 cm alto x 45 cm ancho x 52 cm prof.",
    materiales: "Haya curvada, asiento tapizado",
    peso: 6,
    cuidados: "Aspirar el tapizado regularmente. Limpiar manchas con paño húmedo y jabón neutro.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 7,
    nombre: "Aparador Uspallata",
    categoria: "Estantes",
    estilo: "Contemporáneo",
    materialPrincipal: "Roble",
    precio: 29700,
    imagen: "assets/aparador-uspallata.png",
    descripcionCorta: "Aparador bajo con puertas y estantes internos regulables, en roble recuperado.",
    descripcionLarga:
      "Con puertas abatibles y estantes interiores regulables, el Aparador Uspallata ofrece guardado elegante para vajilla y mantelería. Su combinación de roble macizo y frentes lisos lo hace muy versátil para living o comedor.",
    historia:
      "El roble de este aparador proviene de demoliciones históricas de la región andina: vigas centenarias que ya cumplieron una vida útil como estructura y hoy encuentran una segunda vida noble como mueble de guardado en tu casa.",
    dimensiones: "78 cm alto x 160 cm ancho x 42 cm prof.",
    materiales: "Roble macizo recuperado",
    peso: 54,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 8,
    nombre: "Biblioteca Recoleta",
    categoria: "Estantes",
    estilo: "Rústico",
    materialPrincipal: "Pino",
    precio: 23400,
    imagen: "assets/biblioteca-recoleta.png",
    descripcionCorta: "Biblioteca modular de estantes abiertos, en pino macizo con laca protectora.",
    descripcionLarga:
      "La Biblioteca Recoleta tiene un diseño modular de estantes abiertos, ideal para libros, objetos decorativos y plantas. Su estructura reforzada soporta gran peso sin perder estabilidad, incluso en espacios de mucho uso.",
    historia:
      "Cada estante se refuerza con ensambles de cola de milano, una técnica que aprendimos de los muebles que restauramos en nuestro taller. Preferimos la resistencia estructural probada por siglos antes que los sistemas de tornillería rápida.",
    dimensiones: "180 cm alto x 90 cm ancho x 30 cm prof.",
    materiales: "Pino macizo, laca protectora",
    peso: 40,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: true
  },
  {
    id: 9,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Mesas",
    estilo: "Minimalista",
    materialPrincipal: "Cerezo",
    precio: 6800,
    imagen: "assets/mesa-de-noche-aconcagua.png",
    descripcionCorta: "Mesa de luz compacta con cajón, en madera de cerezo recuperado.",
    descripcionLarga:
      "Compacta y funcional, la Mesa de Noche Aconcagua suma un cajón amplio y una repisa inferior abierta. Su tamaño la hace ideal tanto para dormitorios grandes como para espacios reducidos, sin perder calidez.",
    historia:
      "Usamos los recortes de cerezo que sobran de piezas más grandes, como la Mesa Comedor Pampa, para fabricar estas mesas de luz. Es nuestra forma de aprovechar cada tabla al máximo y reducir el desperdicio del taller a casi cero.",
    dimensiones: "55 cm alto x 45 cm ancho x 38 cm prof.",
    materiales: "Cerezo recuperado",
    peso: 12,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 10,
    nombre: "Escritorio Costa",
    categoria: "Mesas",
    estilo: "Minimalista",
    materialPrincipal: "Pino",
    precio: 19500,
    imagen: "assets/escritorio-costa.png",
    descripcionCorta: "Escritorio de trabajo con cajonera integrada y pasacables, en pino macizo.",
    descripcionLarga:
      "El Escritorio Costa fue pensado para el home office: superficie amplia, cajonera con llave y pasacables integrado. Su diseño minimalista en pino macizo se adapta a cualquier ambiente de trabajo, del más clásico al más nórdico.",
    historia:
      "Diseñamos este escritorio junto a un grupo de trabajadores remotos que nos pidieron algo simple, honesto y silencioso. El resultado es una superficie sin adornos innecesarios, donde la madera hace todo el trabajo estético.",
    dimensiones: "75 cm alto x 130 cm ancho x 60 cm prof.",
    materiales: "Pino macizo, herrajes metálicos",
    peso: 28,
    cuidados: "Limpieza con paño seco. Hidratar la madera con aceites naturales semestralmente.",
    acabados: ACABADOS,
    destacado: false
  },
  {
    id: 11,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Sillones",
    estilo: "Contemporáneo",
    materialPrincipal: "Madera y cuero ecológico",
    precio: 13200,
    imagen: "assets/silla-de-trabajo-belgrano.png",
    descripcionCorta: "Silla ergonómica con altura regulable, estructura de madera y cuero ecológico.",
    descripcionLarga:
      "Diseñada para largas jornadas de trabajo, la Silla Belgrano cuenta con altura regulable, apoyabrazos y un respaldo que acompaña la curvatura de la espalda. Combina ergonomía y estética cálida, sin parecer una silla de oficina genérica.",
    historia:
      "Nos propusimos demostrar que una silla de trabajo puede tener alma. Combinamos un mecanismo de regulación de altura de calidad industrial con una estructura de madera tallada a mano y cuero ecológico curtido sin cromo.",
    dimensiones: "95-105 cm alto (regulable) x 60 cm ancho x 60 cm prof.",
    materiales: "Madera tallada, cuero ecológico curtido sin cromo",
    peso: 16,
    cuidados: "Limpiar con paño húmedo. Evitar la exposición prolongada al sol directo.",
    acabados: ACABADOS,
    destacado: false
  }
];
