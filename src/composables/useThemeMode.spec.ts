import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import {
  useThemeMode,
  getSavedThemeName,
  applyThemeMetaColor,
  THEME_STORAGE_KEY,
  LIGHT_THEME,
  DARK_THEME,
  THEME_META_COLORS
} from './useThemeMode';

describe('useThemeMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = '<meta name="theme-color" content="#FAF4F2" />';
  });

  afterEach(() => {
    localStorage.clear();
    document.head.innerHTML = '';
  });

  function mountThemeHost(initialTheme = LIGHT_THEME) {
    const testVuetify = createVuetify({
      theme: {
        defaultTheme: initialTheme,
        themes: {
          [LIGHT_THEME]: { dark: false, colors: {} },
          [DARK_THEME]: { dark: true, colors: {} }
        }
      }
    });

    let api!: ReturnType<typeof useThemeMode>;
    const Host = defineComponent({
      setup() {
        api = useThemeMode();
        return () => h('div');
      }
    });

    mount(Host, { global: { plugins: [testVuetify] } });
    return { api, testVuetify };
  }

  it('defaults to light theme when nothing is stored in localStorage', () => {
    expect(getSavedThemeName()).toBe(LIGHT_THEME);
  });

  it('reads persisted dark theme from localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME);
    expect(getSavedThemeName()).toBe(DARK_THEME);
  });

  it('falls back to light theme when localStorage has an invalid value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'unknownTheme');
    expect(getSavedThemeName()).toBe(LIGHT_THEME);
  });

  it('toggles between light and dark theme, persisting to localStorage and updating meta theme-color', () => {
    const { api } = mountThemeHost(LIGHT_THEME);
    expect(api.isDark.value).toBe(false);

    api.toggleTheme();

    expect(api.isDark.value).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(DARK_THEME);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      THEME_META_COLORS[DARK_THEME]
    );

    api.toggleTheme();

    expect(api.isDark.value).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(LIGHT_THEME);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      THEME_META_COLORS[LIGHT_THEME]
    );
  });

  it('applyThemeMetaColor safely handles missing meta tag', () => {
    document.head.innerHTML = '';
    expect(() => applyThemeMetaColor(DARK_THEME)).not.toThrow();
  });
});
