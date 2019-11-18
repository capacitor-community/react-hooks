jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Camera: {
        getPhoto: async (options: CameraOptions) => {
          return {
            base64String: 'fake',
            dataUrl: 'fake',
            exif: {},
            format: 'jpeg',
            path: 'fake',
            webPath: 'fake'
          }
        }
      }
    },
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { useCameraGetPhoto } from './useCamera';

import { renderHook, act } from '@testing-library/react-hooks'
import { CameraOptions } from '@capacitor/core';

it('Gets photo', async () => {
  const { result } = renderHook(() => useCameraGetPhoto());

  await act(async () => {
    const {getPhoto, isAvailable} = result.current;

    expect(isAvailable).toBe(true);

    const photo = await getPhoto!({
      quality: 90,
      allowEditing: true,
      resultType: 'base64' as any
    });

    expect(photo).toMatchObject({
      base64String: 'fake',
      dataUrl: 'fake',
      exif: {},
      format: 'jpeg',
      path: 'fake',
      webPath: 'fake'
    })
  });
});