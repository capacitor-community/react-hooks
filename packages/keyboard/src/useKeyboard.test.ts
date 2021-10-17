import { useKeyboard } from './useKeyboard';
import { renderHook, act } from '@testing-library/react-hooks';

it('Gets keyboard state', async () => {
  const r = renderHook(() => useKeyboard());
  await act(async () => {
    const state = r.result;
    expect(state.current.isOpen).toBe(false);
    expect(state.current.keyboardHeight).toBe(0);

    const ev = new CustomEvent('ionKeyboardDidShow', { detail: { keyboardHeight: 150 } });
    window.dispatchEvent(ev);
  });

  await act(async () => {
    const state = r.result.current;
    expect(state.isOpen).toBe(true);
    expect(state.keyboardHeight).toBe(150);

    const ev = new CustomEvent('ionKeyboardDidHide');
    window.dispatchEvent(ev);
  });

  await act(async () => {
    const state = r.result.current;
    expect(state.isOpen).toBe(false);
    expect(state.keyboardHeight).toBe(0);
  });
});
