// Styles
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { lucideAliases, lucideIconSet } from './icons'


export default createVuetify({
  theme: {
    defaultTheme: 'bcasongs',
    themes: {
      bcasongs: {
        dark: false,
        colors: {
          primary: '#9E3B4D',
          'on-primary': '#FFFFFF',
          'primary-container': '#FDE2E7',
          'on-primary-container': '#591826',

          secondary: '#5D5053',
          'on-secondary': '#FFFFFF',
          'secondary-container': '#EFE6E8',
          'on-secondary-container': '#2E2426',

          tertiary: '#8F5B1E',
          'on-tertiary': '#FFFFFF',
          'tertiary-container': '#FBEAD4',
          'on-tertiary-container': '#4D2F0C',

          error: '#B91C1C',
          'on-error': '#FFFFFF',
          'error-container': '#FEE2E2',
          'on-error-container': '#7F1D1D',

          background: '#FAF4F2',
          'on-background': '#21191B',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-dim': '#F1E7E8',
          'surface-variant': '#5D5053',
          'on-surface': '#21191B',
          'on-surface-variant': '#5D5053',

          'surface-container-lowest': '#FFFFFF',
          'surface-container-low': '#FDFBFA',
          'surface-container': '#F7F0F1',
          'surface-container-high': '#F1E7E9',
          'surface-container-highest': '#E9DCE0',

          outline: '#A69498',
          'outline-variant': '#E8DDE0',

          'inverse-surface': '#2A2022',
          'inverse-on-surface': '#FDFBFA',
          'inverse-primary': '#F2A7B5',

          scrim: '#21191B',
          shadow: '#21191B',
        }
      },
    },
  },
  defaults: {
    global: {
      style: {
        fontFamily: 'Roboto, sans-serif'
      }
    }
  },
  icons: {
    defaultSet: 'lucide',
    aliases: lucideAliases,
    sets: {
      lucide: lucideIconSet,
    },
  },
})
