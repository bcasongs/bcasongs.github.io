// Styles
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { lucideAliases, lucideIconSet } from './icons'
import { getSavedThemeName, applyThemeMetaColor, LIGHT_THEME, DARK_THEME } from '../composables/useThemeMode'

const initialTheme = getSavedThemeName()
applyThemeMetaColor(initialTheme)

export default createVuetify({
  theme: {
    defaultTheme: initialTheme,
    themes: {
      [LIGHT_THEME]: {
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
      [DARK_THEME]: {
        dark: true,
        colors: {
          primary: '#F2A4B3',
          'on-primary': '#4A1220',
          'primary-container': '#75293C',
          'on-primary-container': '#FDE2E7',

          secondary: '#D8C7CD',
          'on-secondary': '#352A2E',
          'secondary-container': '#493B41',
          'on-secondary-container': '#F3E9EC',

          tertiary: '#EBC088',
          'on-tertiary': '#3F2407',
          'tertiary-container': '#634118',
          'on-tertiary-container': '#FBEAD4',

          error: '#FCA5A5',
          'on-error': '#450A0A',
          'error-container': '#7F1D1D',
          'on-error-container': '#FEE2E2',

          background: '#2B2226',
          'on-background': '#FAF2F3',
          surface: '#372C31',
          'surface-bright': '#43363C',
          'surface-dim': '#241C20',
          'surface-variant': '#D8C7CD',
          'on-surface': '#FAF2F3',
          'on-surface-variant': '#D8C7CD',

          'surface-container-lowest': '#221B1E',
          'surface-container-low': '#2E2529',
          'surface-container': '#372C31',
          'surface-container-high': '#41343A',
          'surface-container-highest': '#4C3D44',

          outline: '#85747B',
          'outline-variant': '#4E4046',

          'inverse-surface': '#F5ECEE',
          'inverse-on-surface': '#2B2226',
          'inverse-primary': '#9E3B4D',

          scrim: '#120D0F',
          shadow: '#000000',
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
