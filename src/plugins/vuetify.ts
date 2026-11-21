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
          primary: '#2B59C3',
          'on-primary': '#FFFFFF',
          'primary-container': '#DBEAFE',
          'on-primary-container': '#17326B',

          secondary: '#475569',
          'on-secondary': '#FFFFFF',
          'secondary-container': '#E2E8F0',
          'on-secondary-container': '#1E293B',

          tertiary: '#0F766E',
          'on-tertiary': '#FFFFFF',
          'tertiary-container': '#CCFBF1',
          'on-tertiary-container': '#115E59',

          error: '#C92A2A',
          'on-error': '#FFFFFF',
          'error-container': '#FEE2E2',
          'on-error-container': '#7F1D1D',

          background: '#F4F7FB',
          'on-background': '#0F172A',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-dim': '#E8EFF8',
          'surface-variant': '#475569',
          'on-surface': '#0F172A',
          'on-surface-variant': '#475569',

          'surface-container-lowest': '#FFFFFF',
          'surface-container-low': '#F8FAFC',
          'surface-container': '#F1F5F9',
          'surface-container-high': '#E6EEF9',
          'surface-container-highest': '#DCE6F5',

          outline: '#94A3B8',
          'outline-variant': '#E2E8F0',

          'inverse-surface': '#1E293B',
          'inverse-on-surface': '#F8FAFC',
          'inverse-primary': '#93C5FD',

          scrim: '#0F172A',
          shadow: '#0F172A',
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
