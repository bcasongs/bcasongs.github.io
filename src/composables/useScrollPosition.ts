import { ref, readonly, nextTick, onActivated, onDeactivated, onBeforeUnmount, type Ref } from 'vue';

export type ScrollTarget = HTMLElement | { $el?: unknown } | null;

function resolveElement(target: ScrollTarget): HTMLElement | null {
  if (!target) return null;
  if (target instanceof HTMLElement) return target;
  if ('$el' in target && target.$el instanceof HTMLElement) return target.$el;
  return null;
}

/**
 * Preserves and restores the scroll position of a scrollable container
 * (such as Vuetify's VVirtualScroll) across Vue <keep-alive> deactivations.
 */
export function useScrollPosition(targetRef: Ref<ScrollTarget>) {
  const savedScrollTop = ref(0);
  let isActive = true;
  let rafId: number | null = null;

  const cancelPendingRestore = (): void => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const handleScroll = (event: Event): void => {
    if (!isActive) return;
    const target = event.target as HTMLElement | null;
    if (target) {
      savedScrollTop.value = target.scrollTop;
    }
  };

  const restoreScrollPosition = (): void => {
    cancelPendingRestore();
    const targetPos = savedScrollTop.value;

    const applyPosition = (): void => {
      const el = resolveElement(targetRef.value);
      if (el) {
        el.scrollTop = targetPos;
      }
    };

    // Apply immediately to prevent visual jump on first frame
    applyPosition();

    nextTick(() => {
      applyPosition();
      rafId = requestAnimationFrame(() => {
        rafId = null;
        applyPosition();
        isActive = true;
      });
    });
  };

  const resetScrollPosition = (): void => {
    cancelPendingRestore();
    savedScrollTop.value = 0;
    const el = resolveElement(targetRef.value);
    if (el) {
      el.scrollTop = 0;
    }
  };

  onDeactivated(() => {
    isActive = false;
    cancelPendingRestore();
  });

  onActivated(() => {
    restoreScrollPosition();
  });

  onBeforeUnmount(() => {
    cancelPendingRestore();
  });

  return {
    savedScrollTop: readonly(savedScrollTop),
    handleScroll,
    restoreScrollPosition,
    resetScrollPosition
  };
}
