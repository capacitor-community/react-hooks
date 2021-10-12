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

import { useCamera } from './useCamera';

import { renderHook, act } from '@testing-library/react-hooks'
import { CameraOptions } from '@capacitor/core';

it('Gets photo', async () => {
  const { result } = renderHook(() => useCamera());

  await act(async () => {
    const {getPhoto, photo, isAvailable} = result.current;

    expect(isAvailable).toBe(true);

    getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: 'base64' as any
    });
  });

  await act(async () => {
    const {photo} = result.current;

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