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


it('Must have correct type on initialization', async () => {
  let storeNumber: any;
  let storeBoolean: any;
  let storeArray: any;
  let storeObject: any;
  let storeUndefined: any;
  const storageMock = (Plugins.Storage as any);
  await act(async () => {
    storageMock.__init({});
  });

  await act(async () => {
    storeNumber = renderHook(() => useStorageItem('num', 0));
    storeBoolean = renderHook(() => useStorageItem('bool', true));
    storeArray = renderHook(() => useStorageItem('array', []));
    storeObject = renderHook(() => useStorageItem('obj', {}));
    storeUndefined = renderHook(() => useStorageItem('und'));
  });

  await act(async () => {
    const result = storeBoolean.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("boolean");
    expect(value).toBe(true);
  });
  await act(async () => {
    const result = storeNumber.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("number");
    expect(value).toBe(0);
  });
  await act(async () => {
    const result = storeArray.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("object");
    expect(Array.isArray(value)).toBe(true);
    expect(JSON.stringify(value)).toBe("[]");
  });
  await act(async () => {
    const result = storeObject.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("object");
    expect(JSON.stringify(value)).toBe("{}");
  });
  
  await act(async () => {
    const result = storeUndefined.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("undefined");
    expect(JSON.stringify(value)).toBe(undefined);
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'num'});
    expect(storedValue.value).toBe("0");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'bool'});
    expect(storedValue.value).toBe("true");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'array'});
    expect(storedValue.value).toBe("[]");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'obj'});
    expect(storedValue.value).toBe("{}");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'und'});
    expect(storedValue.value).toBe(undefined);
  });
});


it('Must have correct type when already initiated', async () => {
  let storeNumber: any;
  let storeBoolean: any;
  let storeArray: any;
  let storeObject: any;
  let storeUndefined: any;
  const storageMock = (Plugins.Storage as any);
  await act(async () => {
    storageMock.__init({num:'0', bool: 'true', arr: "[]", obj: "{}", und:'undefined'});
  });

  await act(async () => {
    storeNumber = renderHook(() => useStorageItem('num'));
    storeBoolean = renderHook(() => useStorageItem('bool'));
    storeArray = renderHook(() => useStorageItem('arr'));
    storeObject = renderHook(() => useStorageItem('obj'));
    storeUndefined = renderHook(() => useStorageItem('und'));
  });

  await act(async () => {
    const result = storeBoolean.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("boolean");
    expect(value).toBe(true);
  });
  await act(async () => {
    const result = storeNumber.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("number");
    expect(value).toBe(0);
  });
  await act(async () => {
    const result = storeArray.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("object");
    expect(Array.isArray(value)).toBe(true);
    expect(JSON.stringify(value)).toBe("[]");
  });
  await act(async () => {
    const result = storeObject.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("object");
    expect(JSON.stringify(value)).toBe("{}");
  });
  await act(async () => {
    const result = storeUndefined.result.current;
    const [value, setValue] = result;
    expect(typeof value).toBe("undefined");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'num'});
    expect(storedValue.value).toBe("0");
  });

  await act(async () => {
    const storedValue = await storageMock.get({key: 'bool'});
    expect(storedValue.value).toBe("true");
  });
  await act(async () => {
    const storedValue = await storageMock.get({key: 'arr'});
    expect(storedValue.value).toBe("[]");
  });
  await act(async () => {
    const storedValue = await storageMock.get({key: 'obj'});
    expect(storedValue.value).toBe("{}");
  });
  await act(async () => {
    const storedValue = await storageMock.get({key: 'und'});
    expect(storedValue.value).toBe("undefined");
  });
});