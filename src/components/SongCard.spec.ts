import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import SongCard from './SongCard.vue';

const mockIsAuthenticated = ref(true);

vi.mock('../composables/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated
  })
}));

describe('SongCard.vue', () => {
  const song = { id: 'song-1', title: 'Test Song', content: 'Lyrics', originalKey: 'G' };

  beforeEach(() => {
    mockIsAuthenticated.value = true;
  });

  const mountCard = (props: Record<string, unknown> = {}) =>
    mount(SongCard, {
      props: { song, ...props },
      global: {
        stubs: {
          RouterLink: true
        }
      }
    });

  it('shows delete button only when authenticated and allowDelete is true', () => {
    const withDelete = mountCard({ allowDelete: true });
    expect(withDelete.find('[data-testid="delete-song-btn"]').exists()).toBe(true);

    const withoutDelete = mountCard({ allowDelete: false });
    expect(withoutDelete.find('[data-testid="delete-song-btn"]').exists()).toBe(false);

    mockIsAuthenticated.value = false;
    const unauthenticated = mountCard({ allowDelete: true });
    expect(unauthenticated.find('[data-testid="delete-song-btn"]').exists()).toBe(false);
  });

  it('emits delete with song payload when delete button is clicked', async () => {
    const wrapper = mountCard({ allowDelete: true });
    await wrapper.find('[data-testid="delete-song-btn"]').trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')?.[0]).toEqual([song]);
  });
});
