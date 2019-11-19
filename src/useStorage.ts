// Inspired by useLocalStorage from https://usehooks.com/useLocalStorage/
import { useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
const { Storage } = Plugins;

interface StorageResult extends AvailableResult {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => void;
  getKeys: () => Promise<{ keys: string[]; }>
  clear: () => Promise<void>;
}

type StorageItemResult<T> = [
  T | undefined,
  ((value: T) => Promise<void>),
  boolean
]

const availableFeatures = {
  useStorage: isFeatureAvailable('Storage', 'useStorage')
}

function useStorage(): StorageResult {
  if (!availableFeatures.useStorage) {
    return {
      get: () => { throw new FeatureNotAvailableError() },
      set: () => { throw new FeatureNotAvailableError() },
      remove: () => { throw new FeatureNotAvailableError() },
      getKeys: () => { throw new FeatureNotAvailableError() },
      clear: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    };
  }

  async function get(key: string) {
    const v = await Storage.get({ key });
    if (v) {
      return v.value;
    }
    return null;
  }

  function set(key: string, value: string) {
    return Storage.set({ key, value: value });
  }

  function remove(key: string) {
    return Storage.remove({ key });
  }

  function getKeys() {
    return Storage.keys();
  }

  function clear() {
    return Storage.clear();
  }

  return { get, set, remove, getKeys, clear, isAvailable: true };
}

function useStorageItem<T>(key: string, initialValue?: T): StorageItemResult<T> {
  if (!availableFeatures.useStorage) {
    return [
      undefined,
      () => { throw new FeatureNotAvailableError() },
      false
    ];
  }

  const [storedValue, setStoredValue] = useState<T>();

  useEffect(() => {
    async function loadValue() {
      try {
        const result = await Storage.get({ key });
        if (result.value == undefined && initialValue != undefined) {
          result.value = typeof initialValue === "string" ? initialValue : JSON.stringify(initialValue);
          setValue(result.value as any);
        } else {
          setStoredValue(typeof result.value === 'string' ? result.value : JSON.parse(result.value!));
        }
      } catch (e) {
        return initialValue;
      }
    }
    loadValue();
  }, [Storage, setStoredValue, initialValue, key]);

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await Storage.set({ key, value: typeof value === "string" ? value : JSON.stringify(value) });
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

export const StorageHooks = {
  useStorageItem,
  useStorage,
  availableFeatures
}