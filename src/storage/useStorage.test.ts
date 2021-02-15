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
    expect(name).toEqual(null);

    await set('name', 'Max');
    const knownKeys = await getKeys();
    expect(knownKeys).toStrictEqual({ keys: ['name'] });

    await clear();
    name = await get('name');
    expect(name).toEqual(null);
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
