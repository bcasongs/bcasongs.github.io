import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SongMetaBadges from './SongMetaBadges.vue';

describe('SongMetaBadges.vue', () => {
  it('renders formatted musical key with sharp and flat symbols', () => {
    const sharpWrapper = mount(SongMetaBadges, {
      props: { originalKey: 'F#m' }
    });
    expect(sharpWrapper.find('[data-testid="key-chip"]').text()).toBe('F♯m');

    const flatWrapper = mount(SongMetaBadges, {
      props: { originalKey: 'Bbm' }
    });
    expect(flatWrapper.find('[data-testid="key-chip"]').text()).toBe('B♭m');
  });

  it('renders book number with hash prefix', () => {
    const wrapper = mount(SongMetaBadges, {
      props: { bookNumber: 142 }
    });

    expect(wrapper.find('[data-testid="book-number-chip"]').text()).toBe('#142');
    expect(wrapper.find('[data-testid="key-chip"]').exists()).toBe(false);
  });

  it('uses primary color for key and surface-variant for book number', () => {
    const wrapper = mount(SongMetaBadges, {
      props: { originalKey: 'G', bookNumber: '87' }
    });

    const chips = wrapper.findAllComponents({ name: 'VChip' });
    expect(chips).toHaveLength(2);
    expect(chips[0].props('color')).toBe('primary');
    expect(chips[1].props('color')).toBe('surface-variant');
  });

  it('renders nothing when neither key nor book number is provided', () => {
    const wrapper = mount(SongMetaBadges, {
      props: { originalKey: null, bookNumber: null }
    });

    expect(wrapper.find('[data-testid="key-chip"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="book-number-chip"]').exists()).toBe(false);
  });
});
