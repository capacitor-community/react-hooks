import { Plugins, CameraOptions, CameraPhoto } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';
import { useState } from 'react';

interface CameraResult extends AvailableResult { 
  photo?: CameraPhoto, 
  getPhoto: (options: CameraOptions) => Promise<CameraPhoto> 
};

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

  async function getPhoto(options: CameraOptions) {
    const cameraPhoto = await Camera.getPhoto(options);
    setPhoto(cameraPhoto);
    return cameraPhoto;
  }
  
  return {
    photo,
    getPhoto,
    isAvailable: true
  };
}
