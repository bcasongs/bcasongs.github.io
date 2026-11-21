import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAppNavigation } from './useAppNavigation';

const mockBack = vi.fn();
const mockPush = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush
  })
}));

describe('useAppNavigation', () => {
  const originalState = window.history.state;

  beforeEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
  });

  afterEach(() => {
    window.history.replaceState(originalState, '');
  });

  it('calls router.back() when Vue Router history state has a back entry', () => {
    window.history.replaceState({ back: '/', current: '/song/123' }, '');

    const { goBack } = useAppNavigation();
    goBack();

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('falls back to router.push("/") when there is no back entry in history state', () => {
    window.history.replaceState({ back: null, current: '/song/123' }, '');

    const { goBack } = useAppNavigation();
    goBack();

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockBack).not.toHaveBeenCalled();
  });
});
