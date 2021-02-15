import { DeviceInfo, DeviceLanguageCodeResult } from '@capacitor/device';

jest.mock('@capacitor/device', () => {
  return {
    Device: {
      getInfo: async (): Promise<DeviceInfo> => {
        return {
          "name": "Test",
          "operatingSystem": "ios",
          "diskFree": 12228108288,
          "osVersion": "11.2",
          "platform": "ios",
          "memUsed": 93851648,
          "diskTotal": 499054952448,
          "model": "iPhone",
          "manufacturer": "Apple",
          "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
          "isVirtual": true,
          "webViewVersion": "1.0.0"
        }
      },
      getLanguageCode: async (): Promise<DeviceLanguageCodeResult> => {
        return {
          value: 'en'
        }
      }
    }
  }
});

jest.mock('@capacitor/core', () => {
  return {
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { renderHook, act } from '@testing-library/react-hooks'
import { useGetInfo, useGetLanguageCode } from './useDevice';

it('Gets device info and language code', async () => {
  const r = renderHook(() => useGetInfo());

  await act(async () => {
    const result = r.result;
    const { isAvailable } = result.current;
    expect(isAvailable).toBe(true);
  });

  await act(async () => {
    const result = r.result;
    const { info } = result.current;

    expect(info).toMatchObject({
      "name": "Test",
      "operatingSystem": "ios",
      "diskFree": 12228108288,
      "osVersion": "11.2",
      "platform": "ios",
      "memUsed": 93851648,
      "diskTotal": 499054952448,
      "model": "iPhone",
      "manufacturer": "Apple",
      "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
      "isVirtual": true,
      "webViewVersion": "1.0.0"
    });
  });
});

it('Gets device language code', async () => {
  const r = renderHook(() => useGetLanguageCode());

  await act(async () => {
    const result = r.result;
    const { isAvailable } = result.current;
    expect(isAvailable).toBe(true);
  });

  await act(async () => {
    const result = r.result;
    const { languageCode } = result.current;
    expect(languageCode).toBe('en');
  });
});
