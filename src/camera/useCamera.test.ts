
jest.mock('@capacitor/camera', () => {
  return {
    Camera: {
      getPhoto: async (options: ImageOptions) => {
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

import { useCamera } from './useCamera';

import { renderHook, act } from '@testing-library/react-hooks'
import { ImageOptions } from '@capacitor/camera';

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
