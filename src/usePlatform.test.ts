let text = 'fake';
const mock = {
  Capacitor: {
    getPlatform: () => 'ios'
  }
}

jest.mock('@capacitor/core', () => mock);

import { PlatformHooks } from './usePlatform';
const { usePlatform } = PlatformHooks;
import { renderHook, act } from '@testing-library/react-hooks';

it('Gets platform', async () => {
  const { result } = renderHook(() => usePlatform());

  await act(async () => {
    const { platform, isAvailable } = result.current;
    expect(isAvailable).toBe(true);
    expect(platform).toBe('ios');
  });
});