jest.mock('@capacitor/core', () => {
  let listener: any;
  let value = false;
  return {
    Plugins: {
      Accessibility: {
        __updateStatus: () => {
          value = !value;

          listener && listener({ value });
        },
        isScreenReaderEnabled: async () => {
          return { value }
        },
        addListener(eventName: string, cb: ({ value }: { value: boolean }) => void) {
          listener = cb;
          return { remove: () => {} };
        }
      }
    }
  }
});

import { Plugins } from '@capacitor/core';

import { useAccessibility } from './useAccessibility';

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets screen reader status', async () => {
  const r = renderHook(() => useAccessibility());

  await act(async function() {
    const result = r.result;

    let isScreenReaderEnabled = result.current as any;

    expect(isScreenReaderEnabled).toBe(false);

    (Plugins.Accessibility as any).__updateStatus();
  });

  await act(async function() {
    const isScreenReaderEnabled = r.result.current as any;

    expect(isScreenReaderEnabled).toBe(true);
  });
});