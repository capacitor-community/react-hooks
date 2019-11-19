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
    },
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }  
  }
});

import { AppHooks } from './useApp';
import { renderHook, act } from '@testing-library/react-hooks'
import { Plugins } from '@capacitor/core';

it('Gets app launch URL', async () => {
  const r = renderHook(() => AppHooks.useLaunchUrl());
  await act(async() => {
    const result = r.result;    
    const {isAvailable} = result.current;
    expect(isAvailable).toBe(true);
    await r.waitForNextUpdate();
    expect(r.result.current.launchUrl).toBe('my-app://awesome');
  });
});

it('Gets app open URL', async () => {
  const r = renderHook(() => AppHooks.useAppUrlOpen());

  await act(async() => {
    const {appUrlOpen} = r.result.current;
    expect(appUrlOpen).toBeUndefined();

    (Plugins.App as any).__updateAppUrlOpen();
  });

  await act(async() => {
    const {appUrlOpen} = r.result.current;
    expect(appUrlOpen).toBe('my-app://very-legal-very-cool');
  });
});

it('Gets app state', async () => {
  const r = renderHook(() => AppHooks.useAppState());
  await act(async () => {
    const result = r.result;

    expect(result.current.state).toBe(true);

    (Plugins.App as any).__updateAppState();
  });

  await act(async() => {
    const state = r.result.current;
    expect(state.state).toBe(false);
  });
});
