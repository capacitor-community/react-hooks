// Inspired by useLocalStorage from https://usehooks.com/useLocalStorage/
import { useState, useEffect, useCallback } from 'react';

import { Plugins } from '@capacitor/core';

export function useStorage() {
  const { Storage } = Plugins;

  async function get(key: string) {
    const v = await Storage.get({ key });
    if (v) {
      return v.value;
    }
    return null;
  }

  function set(key: string, value: string) {
    return Storage.set({ key, value });
  }

  function remove(key: string) {
    return Storage.remove({ key });
  }

  function keys() {
    return Storage.keys();
  }

  function clear() {
    return Storage.clear();
  }

  return [ get, set, remove, keys, clear ];
}

export function useStorageItem(key: string, initialValue: string) {
  const { Storage } = Plugins;

  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    async function loadValue() {
      try {
        const value = await Storage.get({ key });
        setStoredValue(value.value ? JSON.parse(value.value!) : initialValue);
      } catch (e) {
        return initialValue;
      }
    }
    loadValue();
  }, [setStoredValue]);

  const setValue = async (value: any) => {
    try {
      setStoredValue(value);

      await Storage.set({ key, value: JSON.stringify(value) });
    } catch (e) {
      console.error(e);
    }
  }

  return [ storedValue, setValue ];
}