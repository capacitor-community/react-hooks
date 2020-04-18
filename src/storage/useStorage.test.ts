jest.mock('@capacitor/core', () => {
  let data: any = {}
  return {
    Plugins: {
      Storage: {
        __init: (d: any) => {
          data = d;
        },
        get: async ({ key }: { key: string }) => {
          return { value: data[key] };
        },
        set: async ({ key, value }: { key: string, value: string }): Promise<void> => {
          data[key] = value;
        },
        remove: async ({ key }: { key: string }) => {
          delete data[key];
        },
        keys: async () => {
          return Object.keys(data);
        },
        clear: async () => {
          data = {};
        }
      }
    },
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { Plugins } from '@capacitor/core';
import { renderHook, act } from '@testing-library/react-hooks'
import { useStorage, useStorageItem } from './useStorage';

it('Gets and sets storage values', async () => {
  const r = renderHook(() => useStorage());

  await act(async () => {
    const result = r.result.current;
    const { isAvailable } = result;
    expect(isAvailable).toBe(true);
  });

  await act(async () => {
    const result = r.result.current;

    const { get, set, remove, getKeys, clear } = result;

    await set('name', 'Max');

    let name = await get('name');
    expect(name).toEqual('Max');

    await remove('name');
    name = await get('name');
    expect(name).toEqual(undefined);

    await set('name', 'Max');
    const knownKeys = await getKeys();
    expect(knownKeys).toStrictEqual(['name']);

    await clear();
    name = await get('name');
    expect(name).toEqual(undefined);
  });
});

it('Manages individual item', async () => {
  let r: any;
  await act(async () => {
    r = renderHook(() => useStorageItem('name', 'Max'));
  });

  await act(async () => {
  });

  await act(async () => {
    const result = r.result.current;

    const [value, setValue] = result;
    expect(value).toBe('Max');

    setValue('Frank');
  });

  await act(async () => {
    const result = r.result.current;

    const [value, setValue] = result;
    expect(value).toBe('Frank');
  });
});

it('Manages individual item with stored value', async () => {
  let r: any;
  
  const storageMock = (Plugins.Storage as any);
  await act(async () => {
    storageMock.__init({ name: 'Matilda'});
  });

  await act(async () => {
    r = renderHook(() => useStorageItem('name', 'Max'));
  });

  await act(async () => {
  });

  await act(async () => {
    const result = r.result.current;

    const [value, setValue] = result;
    expect(value).toBe('Matilda');

    setValue('Frank');
  });
});

it('Sets storage value using previous value', async () => {
  let r: any;
  const storageMock = (Plugins.Storage as any);
  await act(async () => {
    storageMock.__init({ name: 'Max'});
  });

  await act(async () => {
    r = renderHook(() => useStorageItem('name', ''));
  });

  await act(async () => {
  });

  await act(async () => {
    const result = r.result.current;

    const [value, setValue] = result;
    expect(value).toBe('Max');

    setValue((name: string) => name.toUpperCase());
  });

  await act(async () => {
    const result = r.result.current;

    const [value, setValue] = result;
    expect(value).toBe('MAX');
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'name'});
    expect(storedValue.value).toBe('MAX');
  });
});
