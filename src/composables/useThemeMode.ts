import { computed } from 'vue';
import { useTheme } from 'vuetify';

export const THEME_STORAGE_KEY = 'bcasongs_theme';
export const LIGHT_THEME = 'bcasongs';
export const DARK_THEME = 'bcasongsDark';

export type ThemeName = typeof LIGHT_THEME | typeof DARK_THEME;

export const THEME_META_COLORS: Record<ThemeName, string> = {
  [LIGHT_THEME]: '#FAF4F2',
  [DARK_THEME]: '#2B2226'
};

export function getSavedThemeName(): ThemeName {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === DARK_THEME || saved === LIGHT_THEME) {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  return LIGHT_THEME;
}

export function applyThemeMetaColor(themeName: ThemeName): void {
  if (typeof document === 'undefined') return;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', THEME_META_COLORS[themeName]);
  }
}

export function useThemeMode() {
  const theme = useTheme();

  const isDark = computed(() => theme.global.name.value === DARK_THEME);

  const setTheme = (themeName: ThemeName): void => {
    theme.change(themeName);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch {
      // Ignore storage write errors
    }
    applyThemeMetaColor(themeName);
  };

  const toggleTheme = (): void => {
    setTheme(isDark.value ? LIGHT_THEME : DARK_THEME);
  };

  return {
    isDark,
    setTheme,
    toggleTheme
  };
}
