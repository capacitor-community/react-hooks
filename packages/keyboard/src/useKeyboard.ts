import { useState, useEffect } from 'react';
import { Keyboard, KeyboardInfo, KeyboardPlugin } from '@capacitor/keyboard';
import { AvailableResult } from './util/models';
import { Capacitor } from '@capacitor/core';
interface KeyboardResult extends AvailableResult {
  isOpen: boolean;
  keyboardHeight: number;
  keyboard: KeyboardPlugin;
}

if (!Capacitor.isPluginAvailable('Keyboard')) {
  console.warn('The @capacitor/keyboard plugin was not found, did you forget to install it?');
}

export function useKeyboard(): KeyboardResult {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showCallback = (ki: KeyboardInfo) => {
      const keyboardHeight = ki.keyboardHeight;
      setIsOpen(true);
      setKeyboardHeight(keyboardHeight);
    };
    const hideCallback = () => {
      setIsOpen(false);
      setKeyboardHeight(0);
    };
    Keyboard.addListener('keyboardDidShow', showCallback);
    Keyboard.addListener('keyboardDidHide', hideCallback);

    return () => {
      Keyboard.removeAllListeners();
    };
  }, [setIsOpen, setKeyboardHeight]);

  return {
    isOpen,
    keyboardHeight,
    isAvailable: true,
    keyboard: Keyboard,
  };
}
