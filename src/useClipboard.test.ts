import { ClipboardHooks } from './useClipboard';
const { useClipboard } = ClipboardHooks;

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
    },
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
    const { getClipboardData, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await getClipboardData();
  });

  await act(async () => {
    const result = r.result;
    expect(result.current.data).toBe('fake');
  });
});

it('Writes clipboard data', async () => {
  const { result } = renderHook(() => useClipboard());

  await act(async () => {
    const { setClipboardData, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await setClipboardData('testing');
  });

  await act(async () => {
    const { getClipboardData } = result.current;
    await getClipboardData();
  });

  await act(async () => {
    const {data} = result.current;
    expect(data).toBe('testing');
  });
});