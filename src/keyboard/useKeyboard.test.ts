import { KeyboardInfo } from "@capacitor/keyboard";

jest.mock('@capacitor/keyboard', () => {
  let listeners: any = {}

  return {
    Keyboard: {
      addListener: (eventName: string, cb: (info: KeyboardInfo) => void) => {
        console.log('Listener', cb)
        listeners[eventName] = cb;
      },
      removeAllListeners: () => {
        listeners = {}
      },
      dispatchEvent: (ev: CustomEvent) => {
        listeners[ev.type](ev)
      }
    }
  }
});

jest.mock('@capacitor/core', () => {
  return {
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { useKeyboardState } from './useKeyboard';
import { renderHook, act } from '@testing-library/react-hooks';

import { Keyboard } from '@capacitor/keyboard'

it('Gets keyboard state', async () => {
  const r = renderHook(() => useKeyboardState());
  await act(async () => {
    const state = r.result;
    expect(state.current.isOpen).toBe(false);
    expect(state.current.keyboardHeight).toBe(0);

    const ev = new CustomEvent('keyboardDidShow', { detail: { keyboardHeight: 150 } });
    (Keyboard as any).dispatchEvent(ev);
  });

  await act(async() => {
    const state = r.result.current;
    expect(state.isOpen).toBe(true);
    expect(state.keyboardHeight).toBe(150);

    const ev = new CustomEvent('keyboardDidHide');
    (Keyboard as any).dispatchEvent(ev);
  });

   await act(async() => {
    const state = r.result.current;
    expect(state.isOpen).toBe(false);
    expect(state.keyboardHeight).toBe(0);
  });
});
