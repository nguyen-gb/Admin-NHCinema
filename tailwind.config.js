/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        primary: '#EA3B92',
        secondary: '#0A031C',
        tertiary: '#640d9a',
        quaternary: '#020510'
      },
      boxShadow: {
        ct: '0 0 50px rgba(255, 255, 255, 0.4)',
        ct3d: '2px 5px 3px rgba(255, 255, 255, 0.9)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6')
        }
      })
    })
  ]
}
