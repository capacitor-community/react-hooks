jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Camera: {
        getPhoto: async (options: CameraOptions) => {
          console.log('Getting photo', options);
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
  }
});

import { useCamera } from './useCamera';

import { renderHook, act } from '@testing-library/react-hooks'
import { CameraOptions, CameraResultType } from '@capacitor/core';

it('Gets photo', async () => {
  const { result } = renderHook(() => useCamera());

  await act(async () => {
    const getPhoto = result.current as any;
    const photo = await getPhoto({
      quality: 90,
      allowEditing: true
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