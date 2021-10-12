let text = 'fake';
const mock = {
  Plugins: {
    Browser: {
      text: 'fake',
      open: jest.fn(),
      prefetch: jest.fn(),
      close: jest.fn()
    }
  },
  Capacitor: {
    isPluginAvailable: () => true,
    platform: 'ios'
  }
}

jest.mock('@capacitor/core', () => mock);

import { useOpen, useClose, usePrefetch } from './useBrowser'
import { renderHook, act } from '@testing-library/react-hooks'

it('Opens url', async () => {
  const { result } = renderHook(() => useOpen());

  await act(async () => {
    const { open, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await open({ url: 'http://ionicframework.com' });
    expect(mock.Plugins.Browser.open).toHaveBeenCalledWith({ url: 'http://ionicframework.com' })
  });
  jest.resetAllMocks();
});

it('Closes url', async () => {
  const { result } = renderHook(() => useClose());

  await act(async () => {
    const { close, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await close();
    expect(mock.Plugins.Browser.close).toHaveBeenCalledTimes(1);
  });
  jest.resetAllMocks();
});

it('Prefetches url', async () => {
  const { result } = renderHook(() => usePrefetch());

  await act(async () => {
    const { prefetch, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await prefetch({ urls: ['http://ionicframework.com']});
    expect(mock.Plugins.Browser.prefetch).toHaveBeenCalledWith({ urls: ['http://ionicframework.com']})
  });
});