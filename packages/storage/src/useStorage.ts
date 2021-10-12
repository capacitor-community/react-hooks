// Inspired by useLocalStorage from https://usehooks.com/useLocalStorage/
import { useState, useEffect, useCallback } from 'react';
import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';

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

export const availableFeatures = {
  useStorage: isFeatureAvailable('Storage', 'useStorage')
}

export function useStorage(): StorageResult {
  const { Storage } = Plugins;

  if (!availableFeatures.useStorage) {
    return {
      get: featureNotAvailableError,
      set: featureNotAvailableError,
      remove: featureNotAvailableError,
      getKeys: featureNotAvailableError,
      clear: featureNotAvailableError,
      ...notAvailable
    };
  }

  const get = useCallback(async (key: string) => {
    const v = await Storage.get({ key });
    if (v) {
      return v.value;
    }
    return null;
  }, []);

  const set = useCallback((key: string, value: string) => {
    return Storage.set({ key, value: value });
  }, []);

  const remove = useCallback((key: string) => {
    return Storage.remove({ key });
  }, []);

  const getKeys = useCallback(() => {
    return Storage.keys();
  }, []);

  const clear = useCallback(() => {
    return Storage.clear();
  }, []);

  return { get, set, remove, getKeys, clear, isAvailable: true };
}

export function useStorageItem<T>(key: string, initialValue?: T): StorageItemResult<T> {
  const { Storage } = Plugins;
  
  if (!availableFeatures.useStorage) {
    return [
      undefined,
      featureNotAvailableError,
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
