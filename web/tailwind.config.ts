import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.4375rem',
        'xs': '0.625rem',
        'sm': '0.875rem',
        'base': '1rem',
        'md': '1.25rem', 
        'lg': '1.5rem', 
        'xl': '2rem',
      },
      backgroundImage: {
        'linear-l-black': 'linear-gradient(-90deg, #ffffff00, #00000080);',
        'linear-r-black': 'linear-gradient(90deg, #ffffff00, #000000);',
        'linear-t-blue': 'linear-gradient(180deg, #1F1D3675, #1F1D36);',
        'linear-b-blue': 'linear-gradient(transparent, #292635);',
        'linear-b-dark-blue': 'linear-gradient(transparent, #1F1D36);',
      },
      colors: {
        white: {
          100: '#ffffff',
          200: '#ffffff50',
        },
        gray: {
          500: '#6d6c7c',
          900: '#332E34'
        },
        blue: {
          300: '#40BCF4',
          700: '#292635',
          900: '#1F1D36',
        },
        yellow: {
          500: '#F6CB32',
        },
        red: {
          500: '#EC2626',
        },
        green: {
          300: '#00E054',
        },
        purple: {
          'twitch': '#9C4FFF',
          'discord': '#5D6AF2',
        },
        black: {
          100: '#000000',
        }
      },
      screens: {
        responsive: {'max': '615px'},
        'small-screen': {'max': '370px'},
        navbar: {'max': '950px'},
      },
    },
  },
  plugins: [],
}
export default config
