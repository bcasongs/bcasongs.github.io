import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useScrollPosition, type ScrollTarget } from './useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function createKeepAliveHost(useComponentWrapper = false) {
    let api!: ReturnType<typeof useScrollPosition>;

    const ChildScroller = defineComponent({
      name: 'ChildScroller',
      render() {
        return h('div', { 'data-testid': 'scroll-box' });
      }
    });

    const ScrollView = defineComponent({
      name: 'ScrollView',
      setup() {
        const containerRef = ref<ScrollTarget>(null);
        api = useScrollPosition(containerRef);
        return { containerRef, handleScroll: api.handleScroll };
      },
      render() {
        if (useComponentWrapper) {
          return h(ChildScroller, {
            ref: 'containerRef',
            onScroll: this.handleScroll
          });
        }
        return h('div', {
          ref: 'containerRef',
          'data-testid': 'scroll-box',
          onScroll: this.handleScroll
        });
      }
    });

    const OtherView = defineComponent({
      name: 'OtherView',
      render() {
        return h('div', { 'data-testid': 'other-view' }, 'Other');
      }
    });

    const Host = defineComponent({
      setup() {
        const showList = ref(true);
        return { showList };
      },
      render() {
        return h(KeepAlive, null, {
          default: () => (this.showList ? h(ScrollView) : h(OtherView))
        });
      }
    });

    const wrapper = mount(Host);
    return { wrapper, getApi: () => api };
  }

  it('tracks scrollTop on scroll events', async () => {
    const { wrapper, getApi } = createKeepAliveHost();
    const el = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;

    el.scrollTop = 450;
    await wrapper.find('[data-testid="scroll-box"]').trigger('scroll');

    expect(getApi().savedScrollTop.value).toBe(450);
  });

  it('restores scrollTop after keep-alive deactivation and reactivation', async () => {
    const { wrapper } = createKeepAliveHost();
    const el = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;

    el.scrollTop = 1200;
    await wrapper.find('[data-testid="scroll-box"]').trigger('scroll');

    // Simulate navigating away: deactivate component and browser resetting scrollTop to 0
    wrapper.vm.showList = false;
    await nextTick();
    el.scrollTop = 0;

    // Simulate navigating back: reactivate component
    wrapper.vm.showList = true;
    await nextTick();
    await nextTick();

    const restoredEl = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;
    expect(restoredEl.scrollTop).toBe(1200);
  });

  it('resolves $el when ref points to a component instance (like VVirtualScroll)', async () => {
    const { wrapper } = createKeepAliveHost(true);
    const el = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;

    el.scrollTop = 850;
    await wrapper.find('[data-testid="scroll-box"]').trigger('scroll');

    wrapper.vm.showList = false;
    await nextTick();
    el.scrollTop = 0;

    wrapper.vm.showList = true;
    await nextTick();
    await nextTick();

    const restoredEl = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;
    expect(restoredEl.scrollTop).toBe(850);
  });

  it('ignores stray scroll events while deactivated', async () => {
    const { wrapper, getApi } = createKeepAliveHost();
    const el = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;

    el.scrollTop = 700;
    await wrapper.find('[data-testid="scroll-box"]').trigger('scroll');

    wrapper.vm.showList = false;
    await nextTick();

    // Stray scroll event with scrollTop = 0 while deactivated
    el.scrollTop = 0;
    getApi().handleScroll({ target: el } as unknown as Event);

    expect(getApi().savedScrollTop.value).toBe(700);
  });

  it('resets both savedScrollTop and element scrollTop to 0', async () => {
    const { wrapper, getApi } = createKeepAliveHost();
    const el = wrapper.find('[data-testid="scroll-box"]').element as HTMLElement;

    el.scrollTop = 900;
    await wrapper.find('[data-testid="scroll-box"]').trigger('scroll');
    expect(getApi().savedScrollTop.value).toBe(900);

    getApi().resetScrollPosition();

    expect(getApi().savedScrollTop.value).toBe(0);
    expect(el.scrollTop).toBe(0);
  });
});
