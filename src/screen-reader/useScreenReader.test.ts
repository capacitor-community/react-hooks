jest.mock('@capacitor/screen-reader', () => {
  let listener: any;
  let value = true;
  return {
      ScreenReader: {
        __updateStatus: () => {
          value = !value;

          listener && listener({ value });
        },
        isEnabled: async () => {
          return { value }
        },
        addListener(_eventName: string, cb: ({ value }: { value: boolean }) => void) {
          listener = cb;
          return { remove: () => {} };
        }
      }
  }
});

jest.mock('@capacitor/core', () => {
  let listener: any;
  let value = true;
  return {
    Capacitor: {
      isPluginAvailable: jest.fn(() => true),
      platform: 'ios'
    }
  }
});


import { useIsScreenReaderEnabled } from './useScreenReader';

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets screen reader status', async () => {
  const r = renderHook(() => useIsScreenReaderEnabled());

  await act(async function() {
    const result = r.result;

    let {isScreenReaderEnabled, isAvailable} = result.current;

    expect(isScreenReaderEnabled).toBeUndefined();
    expect(isAvailable).toBe(true);
    await r.waitForNextUpdate();

    expect(r.result.current.isScreenReaderEnabled).toBe(true);
  });

});
