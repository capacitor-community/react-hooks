import { useState, useEffect } from 'react';
import { AvailableResult } from '../util/models';

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
    window.addEventListener('ionKeyboardDidShow', showCallback);
    window.addEventListener('ionKeyboardDidHide', hideCallback);
    
    return () => {
      window.removeEventListener('ionKeyboardDidShow', showCallback);
      window.removeEventListener('ionKeyboardDidHide', hideCallback);
    }
  }, [setKeyboardState]);
  
  return {
    isOpen: state.isOpen,
    keyboardHeight: state.keyboardHeight,
    isAvailable: true
  };
}