/* ============================================================
   DATOS DEL CATÁLOGO
   Requisito técnico de la consigna: "Productos en array de objetos (.js)"

   Es un array (lista) donde cada elemento es un objeto (un producto)
   con sus propiedades. De acá leen todas las páginas del sitio.

   OJO: js/catalogo.js solo usa nombre, precio, descripcion e imagen.
   La propiedad "detalles" queda guardada acá para producto.html.
   ============================================================ */

const productos = [

    {
        id: 1,
        nombre: "Sofá Patagonia",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        imagen: "assets/sofa-patagonia.png",
        detalles: [
            { etiqueta: "Medidas", valor: "220 × 90 × 80 cm" },
            { etiqueta: "Estructura", valor: "Madera de eucalipto certificada FSC®" },
            { etiqueta: "Tapizado", valor: "Lino 100% natural premium" },
            { etiqueta: "Relleno", valor: "Espuma HR + plumón reciclado" },
            { etiqueta: "Sostenibilidad", valor: "Materiales 100% reciclables" }
        ]
    },

    {
        id: 2,
        nombre: "Mesa Comedor Pampa",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        imagen: "assets/mesa-comedor-pampa.png",
        detalles: [
            { etiqueta: "Medidas", valor: "160-240 × 90 × 75 cm" },
            { etiqueta: "Materiales", valor: "Roble macizo FSC®, mecanismo alemán" },
            { etiqueta: "Acabado", valor: "Aceite-cera natural" },
            { etiqueta: "Capacidad", valor: "6-10 comensales" },
            { etiqueta: "Extensión", valor: "Sistema de mariposa central" }
        ]
    },

    {
        id: 3,
        nombre: "Sillas Córdoba",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        imagen: "assets/sillas-cordoba.png",
        detalles: [
            { etiqueta: "Medidas", valor: "45 × 52 × 80 cm (cada una)" },
            { etiqueta: "Materiales", valor: "Contrachapado nogal, tubo de acero" },
            { etiqueta: "Acabado", valor: "Laca mate, pintura epoxi" },
            { etiqueta: "Apilables", valor: "Hasta 6 sillas" },
            { etiqueta: "Incluye", valor: "Set de 4 sillas" }
        ]
    },

    {
        id: 4,
        nombre: "Escritorio Costa",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        imagen: "assets/escritorio-costa.png",
        detalles: [
            { etiqueta: "Medidas", valor: "120 × 60 × 75 cm" },
            { etiqueta: "Materiales", valor: "Bambú laminado, herrajes ocultos" },
            { etiqueta: "Acabado", valor: "Laca mate resistente" },
            { etiqueta: "Almacenamiento", valor: "1 cajón con organizador" },
            { etiqueta: "Cables", valor: "Pasacables integrado" }
        ]
    },

    {
        id: 5,
        nombre: "Silla de Trabajo Belgrano",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        imagen: "assets/silla-de-trabajo-belgrano.png",
        detalles: [
            { etiqueta: "Medidas", valor: "60 × 60 × 90-100 cm" },
            { etiqueta: "Materiales", valor: "Malla técnica, tejido reciclado" },
            { etiqueta: "Acabado", valor: "Base cromada, tapizado premium" },
            { etiqueta: "Regulación", valor: "Altura + inclinación respaldo" },
            { etiqueta: "Certificación", valor: "Ergonomía europea EN 1335" }
        ]
    },

    {
        id: 6,
        nombre: "Aparador Uspallata",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        imagen: "assets/aparador-uspallata.png",
        detalles: [
            { etiqueta: "Medidas", valor: "180 × 45 × 75 cm" },
            { etiqueta: "Materiales", valor: "Nogal macizo FSC®, herrajes de latón" },
            { etiqueta: "Acabado", valor: "Aceite natural ecológico" },
            { etiqueta: "Peso", valor: "68 kg" },
            { etiqueta: "Capacidad", valor: "6 compartimentos interiores" }
        ]
    },

    {
        id: 7,
        nombre: "Biblioteca Recoleta",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        imagen: "assets/biblioteca-recoleta.png",
        detalles: [
            { etiqueta: "Medidas", valor: "100 × 35 × 200 cm" },
            { etiqueta: "Materiales", valor: "Estructura de acero, estantes de roble" },
            { etiqueta: "Acabado", valor: "Laca mate ecológica" },
            { etiqueta: "Capacidad", valor: "45 kg por estante" },
            { etiqueta: "Modulares", valor: "5 estantes ajustables" }
        ]
    },

    {
        id: 8,
        nombre: "Butaca Mendoza",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        imagen: "assets/butaca-mendoza.png",
        detalles: [
            { etiqueta: "Medidas", valor: "80 × 75 × 85 cm" },
            { etiqueta: "Materiales", valor: "Guatambú macizo, tela bouclé" },
            { etiqueta: "Acabado", valor: "Cera vegetal, tapizado premium" },
            { etiqueta: "Tapizado", valor: "Repelente al agua y manchas" },
            { etiqueta: "Confort", valor: "Espuma alta densidad" }
        ]
    },

    {
        id: 9,
        nombre: "Mesa de Centro Araucaria",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        imagen: "assets/mesa-de-centro-araucaria.png",
        detalles: [
            { etiqueta: "Medidas", valor: "90 × 90 × 45 cm" },
            { etiqueta: "Materiales", valor: "Sobre de mármol Patagonia, patas de nogal" },
            { etiqueta: "Acabado", valor: "Mármol pulido, aceite natural en madera" },
            { etiqueta: "Peso", valor: "42 kg" },
            { etiqueta: "Carga máxima", valor: "25 kg distribuidos" }
        ]
    },

    {
        id: 10,
        nombre: "Mesa de Noche Aconcagua",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        imagen: "assets/mesa-de-noche-aconcagua.png",
        detalles: [
            { etiqueta: "Medidas", valor: "45 × 35 × 60 cm" },
            { etiqueta: "Materiales", valor: "Roble macizo FSC®, herrajes soft-close" },
            { etiqueta: "Acabado", valor: "Barniz mate de poliuretano" },
            { etiqueta: "Almacenamiento", valor: "1 cajón + repisa inferior" },
            { etiqueta: "Características", valor: "Cajón con cierre suave" }
        ]
    },

    {
        id: 11,
        nombre: "Sillón Copacabana",
        precio: 0, // <-- FALTA EL PRECIO
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        imagen: "assets/sillon-copacabana.png",
        detalles: [
            { etiqueta: "Medidas", valor: "90 × 85 × 95 cm" },
            { etiqueta: "Materiales", valor: "Cuero curtido vegetal, acero pintado" },
            { etiqueta: "Acabado", valor: "Cuero anilina premium" },
            { etiqueta: "Rotación", valor: "360° silenciosa y suave" },
            { etiqueta: "Garantía", valor: "10 años en estructura" }
        ]
    }

];
