import { Plugins, CameraOptions, CameraPhoto } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';
import { useState } from 'react';

interface CameraResult extends AvailableResult { photo?: CameraPhoto, getPhoto: (options: CameraOptions) => void };

export const availableFeatures = {
  getPhoto: isFeatureAvailable('Camera', 'getPhoto')
}

export function useCamera(): CameraResult {
  const { Camera } = Plugins;

  const [photo, setPhoto] = useState<CameraPhoto>();

  if(!availableFeatures.getPhoto) {
    return {
      getPhoto: featureNotAvailableError,
      ...notAvailable
    }
  }

  const getPhoto = async (options: CameraOptions) => {
    const photoObject = await Camera.getPhoto(options);
    setPhoto(photoObject);
  }
  
  return {
    photo,
    getPhoto,
    isAvailable: true
  };
}
