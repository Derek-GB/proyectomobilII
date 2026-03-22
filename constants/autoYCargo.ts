interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  images?: any[];
  features?: string[];
  applications?: string[];
  measuresImages?: any[];
}

export const categories = [
  {
    name: 'AUTO Y CARGO',
    subcategories: [
      {
        code: '04.01 (Abrazaderas)',
        name: 'Abrazaderas',
        products: [
          {
            id: 'abrazadera-alta-presion',

            name: 'Abrazadera de alta presión',
            subtitle: 'Con mordaza de apriete',

            images: [
              require('../assets/images/04.01p1.jpeg'),
              require('../assets/images/04.01p2.jpeg'),
            ],

            features: [
              'Para la sujeción de tubos, cables, mangueras, recipientes, etc.',
              'El ancho proporciona una presión amplia sin dañar.',
              'Distribución uniforme de presión.',
              'Acero con recubrimiento anticorrosivo.',
              'Tornillo y tuerca 8.8.',
              'Resistencia: 360 N/mm²',
            ],

            applications: [
              'Conductos hidráulicos',
              'Fabricación de maquinaria',
              'Automoción',
            ],

            measuresImages: [
              require('../assets/images/04.01m1.jpeg'),
              require('../assets/images/04.01m2.jpeg'),
            ]
          },

          {
            id: 'brida-proteccion-goma',

            name: 'Brida con protección de goma',
            subtitle: 'En acero cincado con revestimiento interior',

            images: [
              require('../assets/images/04.01p2.png'),
            ],

            features: [
              'Para la sujeción de tubos, cables, etc.',
              'No son adecuadas para cierres herméticos.',
              'Montaje simple y rápido.',
              'Barra colectora de alta resistencia con proteccion antioxidante.',
              'Los terminales de la barra colectora, son reforzados para evitar que la fijacion ceda.',
            ],

            applications: [
              'Resistencia de traccion 100 kg/cm²',
              'Alargamiento de rotura 200%',
              'Dureza Shore A: 70+5',
              'Resistencia termica: desde -35°C hasta +120°C',
              'Optima resistencia a los fenomenos atmosfericos',
              'Resistente ante gasolina, aceites y grasas, alcohol, acidos y soluciones alcalinas.',
            ],

            measuresImages: [
              require('../assets/images/04.01p2m1.png'),
              require('../assets/images/04.01p2m2.png'),
            ]
          },
        ],
      },

      // 🔥 NUEVA SUBCATEGORÍA (BIEN SEPARADA)
      {
        code: '04.02 (Arandelas)',
        name: 'Arandelas',
        products: [
          {
            id: 'arandela-estanqueidad',

            name: 'Arandela de estanqueidad',
            subtitle: 'Cobre-Segun DIN 7603',

            images: [
              require('../assets/images/04.02p1.png'),
            ],
            measuresImages: [
              require('../assets/images/04.02m1.png'),
              require('../assets/images/04.02m2.png'),
              require('../assets/images/04.02m3.png'),
            ]
          },

          {
            id: 'arandela-estanqueidad2',

            name: 'Arandela de estanqueidad',
            subtitle: 'Aluminio - Según DIN 7603',

            images: [
              require('../assets/images/04.02p2.png'),
            ],
            measuresImages: [
              require('../assets/images/04.02p2m1.png'),
              require('../assets/images/04.02p2m2.png'),
              require('../assets/images/04.02p2m3.png'),
            ],
          },
          {
            id: 'arandela-estanqueidad3',
            subtitle: 'Segun DIN 7603',
            name: 'Arandela de estanqueidad',

            images: [
              require('../assets/images/04.02p3.png'),
            ],
            measuresImages: [
              require('../assets/images/04.02p3m1.png'),
              require('../assets/images/04.02p3m2.png'),
              require('../assets/images/04.02p3m3.png'),
            ]
          },

          {
            id: 'juntas-toricas',

            name: 'Juntas tóricas',

            features: [
              'De Perbunan N (caucho nitrilico).',
              'Resistencia a temperatura:De -35°C hasta +120°C.',
              'Juntas de estanquiedad de reducido volumen, faciles de montar y seguras.',
              'Sirven para hermetizar componentes mecanicos moviles e inmovilesc.',
              'Resistentes a todos los aceites minerales, grasas lubricantes, gasolina, vapor, aire comprimido, acidos debiles, etc.',
            ],

            applications: [
              'Talleres de reparacion de automoviles.',
              'Maquinaria agricola.',
              'Empresas transportistas.',
              'Maquinaria para la construccion.',
              'Talleres de mantenimiento',
              'Construccion mecanica.',
            ],


            images: [
              require('../assets/images/04.02p4.png'),
            ],
            measuresImages: [
              require('../assets/images/04.02p4m1.png'),
            ]
          },


        ],
      },

      // Grapas
      {
        code: '04.03 (Grapas)',
        name: 'Grapa',
        products: [
          {
            id: 'grapa1',

            name: 'Grapa interior',
            subtitle: '500-003-1',

            images: [
              require('../assets/images/04.03p1.png'),
            ],
            measuresImages: [
              require('../assets/images/04.03p1m1.png'),
            ]
          },
          {
            id: 'grapa2',
            
            name: 'Grapa interior',
            subtitle: '500-007',
            
            images: [
              require('../assets/images/04.03p2.png'),
            ],
            measuresImages: [
              require('../assets/images/04.03p2m1.png'),
            ]
          },

          {
            id: 'grapa3',

            name: 'Grapa universal',
            subtitle: '500-813',

            images: [
              require('../assets/images/04.03p3.png'),
            ],
            measuresImages: [
              require('../assets/images/04.03p3m1.png'),
            ]
          },
          
        ],
      },

      // Utiles
      {
        code: '04.04 (Utiles de automocion)',
        name: 'utiles',
        products: [
          {
            id: 'util1',

            name: 'Martillo de inercia 4 puntas',

            features: [
              'Herramienta que ayuda a reparar las partes dañadas para regresar posición de origen, tales como:paneles frontales y traseros,columnas, pasos de rueda,traviesas, marcos, entre otras piezas.',
              'Excelente agarre.',
              'Gran resistencia a la tracción.',
            ],

            images: [
              require('../assets/images/04.04p1.png'),
            ],
            measuresImages: [
              require('../assets/images/04.04p1m1.png'),
            ]
          },

          {
            id: 'util2',

            name: 'Protector para aletas',

            features: [
              'Protege las aletas de los daños durante trabajos de reparacion y mantenimiento.',
              'Para todos los modelos de automovil.',
              'Material: piel sintetica negra.',
              'La cara interior esta cubierta de espuma blanda',
            ],

     
           

            images: [
              require('../assets/images/04.04p2.png'),
            ],
            measuresImages: [
              require('../assets/images/04.04p2m1.png'),
            ]
          },
          

        ],
      },
      
       // Almacenaje
      {
        code: '04.05 (Almacenaje)',
        name: 'almacenaje',
        products: [
          {
            id: 'almacenaje1',

            name: 'GAVETEROS PLÁSTICOS ',

            features: [
              'Ideales para tener el lugar de trabaio totalmente ordenado.',
              'Encastables',
              'Con ranura para etiquetas identificatorias, códigos de barras, etc...',
            ],

            images: [
              require('../assets/images/04.05p1.png'),
            ],
            measuresImages: [
              require('../assets/images/04.05p1m1.png'),
            ]
          },
          {
            id: 'almacenaje2',
            
            name: 'CAJAS DE ALMACENAJE',

            images: [
              require('../assets/images/04.05p2.png'),
            ],
            measuresImages: [
              require('../assets/images/04.05p2m1.png'),
            ]
          }
        ],
      },
    ],
  },
];