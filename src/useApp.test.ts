jest.mock('@capacitor/core', () => {
  let appStateListener: any;
  let appUrlOpenListener: any;
  let isActive = true;
  return {
    Plugins: {
      App: {
        addListener: (eventName: string, cb: any) => {
          switch (eventName) {
            case 'appStateChange':
              appStateListener = cb;
              break;
            case 'appUrlOpen':
              appUrlOpenListener = cb;
              break;
          }
          return { remove: () => {} };
        },
        __updateAppState: () => {
          appStateListener && appStateListener({ isActive: !isActive });
        },
        __updateAppUrlOpen: () => {
          appUrlOpenListener && appUrlOpenListener({ url: 'my-app://very-legal-very-cool' });
        },
        getLaunchUrl: async () => {
          return { url: 'my-app://awesome' }
        }
      }
    }
  }
});

import { Plugins } from '@capacitor/core';

import { useAppLaunchUrl, useAppState, useAppUrlOpen } from './useApp';

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets app launch URL', async () => {
  let result: any;
  await act(async () => {
    result = renderHook(() => useAppLaunchUrl()).result;
  });

  await act(async() => {
    const launchUrl = result.current as any;
    expect(launchUrl).toBe('my-app://awesome');
  });
});

it('Gets app open URL', async () => {
  const r = renderHook(() => useAppUrlOpen());

  await act(async() => {
    const urlOpen = r.result.current as any;
    expect(urlOpen).toBe(null);

    (Plugins.App as any).__updateAppUrlOpen();
  });

  await act(async() => {
    const urlOpen = r.result.current as any;
    expect(urlOpen).toBe('my-app://very-legal-very-cool');
  });
});

it('Gets app state', async () => {
  const r = renderHook(() => useAppState());
  await act(async () => {
    const result = r.result as any;

    expect(result.current).toBe(true);

    (Plugins.App as any).__updateAppState();
  });

  await act(async() => {
    const state = r.result.current as any;
    expect(state).toBe(false);
  });
});