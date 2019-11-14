import { useClipboard } from './useClipboard';

import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('@capacitor/core', () => {
  let text = 'fake';

  return {
    Plugins: {
      Clipboard: {
        text: 'fake',
        read: async () => {
          return { value: text }
        },
        write: async ({ string }: { string: string }) => {
          text = string;
          return {}
        }
      }
    }
  }
});

it('Reads clipboard data', async () => {
  const { result } = renderHook(() => useClipboard());

  await act(async () => {
    const [data, getValue, setValue] = result.current as any;
    await getValue();
  });

  await act(async () => {
    const [data, getValue, setValue] = result.current as any;

    expect(data).toBe('fake');
  });
});

it('Writes clipboard data', async () => {
  const { result } = renderHook(() => useClipboard());

  await act(async () => {
    const [data, getValue, setValue] = result.current as any;
    await setValue('testing');
  });

  await act(async () => {
    const [data, getValue, setValue] = result.current as any;
    await getValue();
  });

  await act(async () => {
    const [data, getValue, setValue] = result.current as any;

    expect(data).toBe('testing');
  });
});