const mock = {
  Browser: {
    text: 'fake',
    open: jest.fn(),
    close: jest.fn()
  },
  Capacitor: {
    isPluginAvailable: () => true,
    platform: 'ios'
  }
}

jest.mock('@capacitor/core', () => ({ Capacitor: mock.Capacitor }));
jest.mock('@capacitor/browser', () => ({ Browser: mock.Browser }));

import { useOpen, useClose } from './useBrowser'
import { renderHook, act } from '@testing-library/react-hooks'

it('Opens url', async () => {
  const { result } = renderHook(() => useOpen());

  await act(async () => {
    const { open, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await open({ url: 'http://ionicframework.com' });
    expect(mock.Browser.open).toHaveBeenCalledWith({ url: 'http://ionicframework.com' })
  });
  jest.resetAllMocks();
});

it('Closes url', async () => {
  const { result } = renderHook(() => useClose());

  await act(async () => {
    const { close, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    await close();
    expect(mock.Browser.close).toHaveBeenCalledTimes(1);
  });
  jest.resetAllMocks();
});
