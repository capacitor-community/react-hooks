import { DeviceInfo, DeviceLanguageCodeResult } from '@capacitor/device';

jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Device: {
        getInfo: async (): Promise<DeviceInfo> => {
          return {
            operatingSystem: 'ios',
            diskFree: 12228108288,
            osVersion: '11.2',
            platform: 'ios',
            memUsed: 93851648,
            diskTotal: 499054952448,
            model: 'iPhone',
            manufacturer: 'Apple',
            isVirtual: true,
          } as any;
        },
        getLanguageCode: async (): Promise<DeviceLanguageCodeResult> => {
          return {
            value: 'en',
          };
        },
      },
    },
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios',
    },
  };
});

import { renderHook, act } from '@testing-library/react-hooks';
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
      diskFree: 12228108288,
      appVersion: '1.0.2',
      appBuild: '123',
      osVersion: '11.2',
      platform: 'ios',
      memUsed: 93851648,
      diskTotal: 499054952448,
      model: 'iPhone',
      manufacturer: 'Apple',
      uuid: '84AE7AA1-7000-4696-8A74-4FD588A4A5C7',
      isVirtual: true,
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
