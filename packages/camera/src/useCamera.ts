import { Camera, ImageOptions, Photo } from '@capacitor/camera';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface CameraResult extends AvailableResult {
  photo?: Photo;
  getPhoto: (options: ImageOptions) => Promise<Photo>;
}

if (!Capacitor.isPluginAvailable('Camera')) {
  console.warn('The @capacitor/camera plugin was not found, did you forget to install it?');
}

export const availableFeatures = {
  getPhoto: isFeatureAvailable('Camera', 'getPhoto'),
};

export function useCamera(): CameraResult {
  const [photo, setPhoto] = useState<Photo>();

  if (!availableFeatures.getPhoto) {
    return {
      getPhoto: featureNotAvailableError,
      ...notAvailable,
    };
  }

  async function getPhoto(options: ImageOptions) {
    const cameraPhoto = await Camera.getPhoto(options);
    setPhoto(cameraPhoto);
    return cameraPhoto;
  }

  return {
    photo,
    getPhoto,
    isAvailable: true,
  };
}
