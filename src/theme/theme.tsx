import { extendTheme } from '@chakra-ui/react';
// import '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");';

const theme = extendTheme({
  // Global styles
  styles: {
    global: {
      'html, body': {
        fontSize: 'md',
        color: 'gray.600',
        lineHeight: 'tall',
      },
      a: {
        color: 'brand.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },

  // Color palette
  colors: {
    brand: {
      "50": "#FFFFFF",
      "100": "#D4EDED",
      "200": "#AADADA",
      "300": "#7FC8C8",
      "400": "#55B5B5",
      "500": "#48A3A7",
      "600": "#3C8B8E",
      "700": "#307275",
      "800": "#245A5C",
      "900": "#184143"
    },
  },

  // Typography
  fonts: {
    heading: 'Roboto, Poppins, sans-serif',
    body: 'Roboto, Inter, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Components
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'base',
      },
      sizes: {
        // Definir tamaños de botón responsivos
        sm: {
          fontSize: ['xs', 'sm'], // xs en pantallas pequeñas, sm en medianas o mayores
          px: [2, 4], // Padding horizontal
          py: [1, 2], // Padding vertical
        },
        md: {
          fontSize: ['sm', 'md'],
          px: [3, 5],
          py: [2, 3],
        },
        lg: {
          fontSize: ['md', 'lg'],
          px: [4, 6],
          py: [3, 4],
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        opac: {
          bg: 'brand.50',
          color: 'brand.500',
          _hover: {
            bg: 'brand.200',
          },
        },
      },
      defaultProps: {
        size: 'md', // Tamaño por defecto
      },
    },
    // Otros componentes
    Tag: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'base',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'brand.50',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          bg: 'brand.50',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        opac: {
          bg: 'brand.50',
          color: 'brand.500',
          _hover: {
            bg: 'brand.200',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        '4xl': {
          fontSize: '4xl',
        },
        '3xl': {
          fontSize: '3xl',
        },
        '2xl': {
          fontSize: '2xl',
        },
        xl: {
          fontSize: 'xl',
        },
        lg: {
          fontSize: 'lg',
        },
        md: {
          fontSize: 'md',
        },
        sm: {
          fontSize: 'sm',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'teal.500',
          },
          _focus: {
            borderColor: 'teal.500',
            boxShadow: '0 0 0 1px teal.500',
          },
        },
      },
    },
    defaultProps: {
      focusBorderColor: 'teal.500',
    },
  },
});

export default theme;
