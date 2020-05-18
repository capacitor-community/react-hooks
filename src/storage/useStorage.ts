// Inspired by useLocalStorage from https://usehooks.com/useLocalStorage/
import { useState, useEffect, useCallback, Dispatch, SetStateAction, useRef } from 'react';
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
  Dispatch<SetStateAction<T | undefined>>,
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

  // We don't want to rerender when initialValue changes so we use ref
  const initialValueRef = useRef(initialValue)

  const [ready, setReady] = useState(false)
  const [storedValue, setStoredValue] = useState<T>();

  useEffect(() => {
    if(ready) return;

    async function loadValue() {
      const initialValue = initialValueRef.current;
      try {
        const result = await Storage.get({ key });
        if (result.value == undefined && initialValue == undefined) return
       
        if (result.value == undefined) {
          setStoredValue(initialValue);
        } else {
          setStoredValue(typeof initialValue === 'string' ? result.value : JSON.parse(result.value!));
        }
        setReady(true);
      } catch (e) {
        // We might have some parse errors
        setReady(true);
        return;
      }
    }
    loadValue();
  }, [Storage, key, ready]);

  useEffect(() => {
      if(!ready) return;
      
      async function updateValue() {
        try {
          await Storage.set({ key, value: typeof storedValue === "string" ? storedValue : JSON.stringify(storedValue) });
        } catch (e) {
          console.error(e);
        }
      }
      updateValue();
  }, [ready, storedValue])

  return [
    storedValue,
    setStoredValue,
    true
  ];
}
