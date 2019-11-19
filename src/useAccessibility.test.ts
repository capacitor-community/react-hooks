jest.mock('@capacitor/core', () => {
  let listener: any;
  let value = true;
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
        addListener(_eventName: string, cb: ({ value }: { value: boolean }) => void) {
          listener = cb;
          return { remove: () => {} };
        }
      }
    },
    Capacitor: {
      isPluginAvailable: jest.fn(() => true),
      platform: 'ios'
    }    
  }
});

import { AccessibilityHooks } from './useAccessibility';

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets screen reader status', async () => {
  const r = renderHook(() => AccessibilityHooks.useIsScreenReaderEnabled());

  await act(async function() {
    const result = r.result;

    let {isScreenReaderEnabled, isAvailable} = result.current;

    expect(isScreenReaderEnabled).toBeUndefined();
    expect(isAvailable).toBe(true);    
    await r.waitForNextUpdate();

    expect(r.result.current.isScreenReaderEnabled).toBe(true);
  });

});