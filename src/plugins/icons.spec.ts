import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { ICON_MAP, lucideAliases, lucideIconSet } from './icons';

const APP_ICONS = [
  'search',
  'close',
  'queue_music',
  'account_circle',
  'add',
  'playlist_add',
  'playlist_remove',
  'share',
  'chevron_left',
  'format_size',
  'music_note',
  'edit',
  'check',
  'add_row_above',
  'add_row_below',
  'delete',
  'drag_indicator',
  'arrow_drop_down',
  'light_mode',
  'dark_mode'
];

describe('Lucide Vuetify Icon Set', () => {
  it('maps every app icon name to an inline SVG component', () => {
    for (const iconName of APP_ICONS) {
      expect(ICON_MAP[iconName]).toBeDefined();

      const Wrapper = defineComponent({
        render() {
          return h(lucideIconSet.component, { icon: iconName, tag: 'i' });
        }
      });

      const wrapper = mount(Wrapper);
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      expect(svg.attributes('width')).toBe('1em');
      expect(svg.attributes('height')).toBe('1em');
    }
  });

  it('resolves all configured Vuetify aliases to valid icons', () => {
    for (const target of Object.values(lucideAliases)) {
      expect(typeof target).toBe('string');
      expect(ICON_MAP[target as string]).toBeDefined();
    }
  });

  it('returns empty output safely for unknown icon names', () => {
    const Wrapper = defineComponent({
      render() {
        return h(lucideIconSet.component, { icon: 'non_existent_icon', tag: 'i' });
      }
    });

    const wrapper = mount(Wrapper);
    expect(wrapper.find('svg').exists()).toBe(false);
  });
});
