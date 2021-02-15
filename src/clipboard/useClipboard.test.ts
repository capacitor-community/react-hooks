import { useClipboard } from './useClipboard';

import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('@capacitor/clipboard', () => {
  let text = 'fake';

  return {
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
});

jest.mock('@capacitor/core', () => {
  let text = 'fake';

  return {
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

it('Reads clipboard data', async () => {
  const r = renderHook(() => useClipboard());

  await act(async () => {
    const result = r.result;
    const { getValue, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await getValue();
  });

  await act(async () => {
    const result = r.result;
    expect(result.current.value).toBe('fake');
  });
});

it('Writes clipboard data', async () => {
  const { result } = renderHook(() => useClipboard());

  await act(async () => {
    const { setValue, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await setValue('testing');
  });

  await act(async () => {
    const { getValue } = result.current;
    await getValue();
  });

  await act(async () => {
    const {value: data} = result.current;
    expect(data).toBe('testing');
  });
});
