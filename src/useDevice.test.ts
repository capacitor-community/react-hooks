import { CameraOptions, CameraResultType, DeviceInfo, DeviceLanguageCodeResult } from '@capacitor/core';

jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Device: {
        getInfo: async (): Promise<DeviceInfo> => {
          return {
            "diskFree": 12228108288,
            "appVersion": "1.0.2",
            "appBuild": "123",
            "osVersion": "11.2",
            "platform": "ios",
            "memUsed": 93851648,
            "diskTotal": 499054952448,
            "model": "iPhone",
            "manufacturer": "Apple",
            "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
            "isVirtual":true
          }
        },
        getLanguageCode: async (): Promise<DeviceLanguageCodeResult> => {
          return {
            value: 'en'
          }
        }
      }
    }
  }
});

import { renderHook, act } from '@testing-library/react-hooks'
import { useDevice } from './useDevice';

it('Gets device info and language code', async () => {
  let r: any;
  await act(async () => {
    r = renderHook(() => useDevice());
  });

  await act(async () => {
    const result = r.result;
    console.log('Got result', result.current);
    const [ info, languageCode ] = result.current as any;
    expect(info).toMatchObject({
      "diskFree": 12228108288,
      "appVersion": "1.0.2",
      "appBuild": "123",
      "osVersion": "11.2",
      "platform": "ios",
      "memUsed": 93851648,
      "diskTotal": 499054952448,
      "model": "iPhone",
      "manufacturer": "Apple",
      "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
      "isVirtual":true
    });

    expect(languageCode).toBe('en');
  });
});