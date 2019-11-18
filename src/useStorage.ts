// Inspired by useLocalStorage from https://usehooks.com/useLocalStorage/
import { useState, useEffect } from 'react';

import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface StorageResult extends AvailableResult {
  get?: (key: string) => Promise<string | null>;
  set?: (key: string, value: string) => Promise<void>;
  remove?: (key: string) => void;
  keys?: () => Promise<{keys: string[];}>
  clear?: () => Promise<void>;
}

export function useStorage(): StorageResult {

  if(!isFeatureAvailable('Storage', 'useStorage')) {
    return notAvailable;
  }

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

  return { get, set, remove, keys, clear, isAvailable: true };
}

type StorageItemResult<T> = [
  T | null | undefined,
  ((value: T) => Promise<void>) | undefined,
  boolean | undefined
]

export function useStorageItem<T>(key: string, initialValue: T): StorageItemResult<T> {

  if(!isFeatureAvailable('Storage', 'useStorage')) {
    return [undefined, undefined, false];
  }

  const { Storage } = Plugins;

  const [storedValue, setStoredValue] = useState<T | null>(null);

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
  }, [ Storage, setStoredValue, initialValue, key ]);

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);

      await Storage.set({ key, value: JSON.stringify(value) });
    } catch (e) {
      console.error(e);
    }
  }

  return [
    storedValue,
    setValue,
    true
  ];
}