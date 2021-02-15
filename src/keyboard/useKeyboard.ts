import { useState, useEffect } from 'react';
import { AvailableResult } from '../util/models';
import { Keyboard } from "@capacitor/keyboard";

interface KeyboardStateResult extends AvailableResult { isOpen?: boolean; keyboardHeight?: number };

export function useKeyboardState(): KeyboardStateResult {
  const [state, setKeyboardState] = useState({
    isOpen: false,
    keyboardHeight: 0
  });

  useEffect(() => {
    const showCallback = (ev: any) => {
      if (typeof (window as any) === 'undefined') { return; }

      const { keyboardHeight } = ev.detail;
      setKeyboardState({
        isOpen: true,
        keyboardHeight
      });
    }
    const hideCallback = () => {
      setKeyboardState({
        isOpen: false,
        keyboardHeight: 0
      });
    }

    Keyboard.addListener('keyboardDidShow', showCallback);
    Keyboard.addListener('keyboardDidHide', hideCallback);

    return () => {
      Keyboard.removeAllListeners()
    }
  }, [setKeyboardState]);

  return {
    isOpen: state.isOpen,
    keyboardHeight: state.keyboardHeight,
    isAvailable: true
  };
}
