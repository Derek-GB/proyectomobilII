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
    name: 'Anclaje',
    subcategories: [
      {
        code: '05.01 (Anclaje metalico)',
        name: 'metalico',
        products: [
          {
            id: 'metalico',

            name: 'ANCLAJE METÁLICO W-FAZ/S',
            subtitle: 'Concreto fisurado no fisurado',

            features: [
              'Elevadas cargas, distancias cortas entre ejes y bordes.',
              'Ahorra tiempo gracias al montaje del perno.',
              'Se puede someter a carga inmediatamente, sin períodos de espera.',
              'Seguridad de montaje al aplicar el para requerido durante el proceso de anclaje',
            ],

            images: [
              require('../assets/images/05.01p1.png'),
            ],

            applications: [
              'Puede ser empleado con cargas medianas a pesadas.',
              'W-FAZ/S sólo puede ser empleado en habitaciones interiores y secas.',
              'Fijación individual: Anclar con Aprovación Técnica Europea en concreto fisurado',
            ],

            measuresImages: [
              require('../assets/images/05.01p1m1.png'),
              require('../assets/images/05.01p1m2.png'),

            ]
          },

        ],


      },

      //Anclaje directo

      {
        code: '05.02 (Anclaje directo)',
        name: 'Anclaje directo',
        products: [
          {
            id: 'anclaje-directo',

            name: 'Anclaje tornillo de hormigón ',

            features: [
              'Colocación rápida y fácil, con profundidad de instalación flexible.',
              'Válido para todo tipo de material base.',
              'No introduce tensiones en el material base,lo que posibilita la instalación a menores distancias entre sí y el borde. Esto permite el uso de placas base de menor tamaño.',
              'No necesita par de apriete.',
              'Se fija directamente al material base sinnecesidad de taco.',
              'Completamente desmontable.',
              'Rosca Triple Hilo que agiliza la instalación.',
              'Punta especial con bordes dentados que mejora el montaje en el material ba.',
            ],

            images: [
              require('../assets/images/05.02p1.png'),
            ],
            measuresImages: [
              require('../assets/images/05.02p1m1.png'),
            ]
          },
        ],
      },



      //Anclaje quimico
      {
        code: '05.03 (Anclaje quimico)',
        name: 'quimico',
        products: [
          {
            id: 'quimico',

            name: 'ANCLAJE WIT-VM250 VINYLESTER 420mL',
            subtitle: 'Para concreto fisurado y no fisurado',

            features: [
              'Concreto fisurado (M12-M30) y no fisurado (M8-M30), Aprovacion Técnica Europea ETA-12/0164.',
              'Anexos reforzados con mortero posteriores, ver información ETA-12/0166.',
            ],

            applications: [
              'Aprobado para concreto fisurado (M12-M30, en zona de tracción de concreto) y concreto no fisurado (M8-M30, zona de presión de concreto) C20/25 a C50/60',
            ],

            images: [
              require('../assets/images/05.03p1.png'),
            ],

            measuresImages: [
              require('../assets/images/05.03p1m1.png'),
            ]
          },
      {
            id: 'quimico1',

            name: 'PISTOLA PARA WIT-VM250 420mL ',
            subtitle: 'Pistola de aplicación manual',

            features: [
              'Art. No. : 00891-003-104',

            ],
            images: [
              require('../assets/images/05.03p2.png'),
            ],


          },

          {
            id: 'quimico2',

            name: 'Anclaje WIT-PE 50 0 EPOXY 580ml ',
            subtitle: 'Pistola de aplicación manual',

            features: [
              'Anclaje mediante adhesión de la resina entre varilla y hormigón',
              'Caducidad mínima en almacenamiento adecuado: 24 meses.',
              'Temperatura de transporte y almacenamiento (cartucho): + 5 °C a + 25 °C..',
              'Homologación técnica europea ATE-07/0313..',
              'Temperatura mínima de los elementos de unión: + 5 °C.',

            ],
            images: [
              require('../assets/images/05.03p3.png'),
              require('../assets/images/05.03p3.2.png'),
            ],
          measuresImages: [
              require('../assets/images/05.03p3m1.png'),
              require('../assets/images/05.03p3m2.png'),
           ]
          },
        ]
      },

      //Taco
      {
        code: '05.04 (Tacos)',
        name: 'taco',
        products: [
          {
            id: 'taco1',

            name: 'TACOS MASTER DE NYLON',
            subtitle: 'Conjunto Taco Masterde nylon',

            features: [
              'El bloqueo de rotación impide que el taco gire dentro del taladro.',
              'La expansión sólo tiene lugar cuando se hace girar el tornillo.',
              'Poliamida (Nylon) de alta calidad.',
              'Estable a temperaturas entre — 40 0C y + 100 0C.',
              
            ],

            images: [
              require('../assets/images/05.04p1.png'),
            ],
            
            applications: [
              'Fijación de elementos de construcción junto con tornillos para madera.',
            ],

            measuresImages: [
              require('../assets/images/05.04p1m1.png'),
              require('../assets/images/05.04p1m2.png'),
              require('../assets/images/05.04p1m3.png'),
              
        ]
      },
        ],
      },
    ],
  },
];

           

      