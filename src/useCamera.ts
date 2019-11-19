import { Plugins, CameraOptions, CameraPhoto } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
import { useState } from 'react';
const { Camera } = Plugins;

interface CameraResult extends AvailableResult { photo?: CameraPhoto, getPhoto: (options: CameraOptions) => void };

const availableFeatures = {
  getPhoto: isFeatureAvailable('Camera', 'getPhoto')
}

function useCamera(): CameraResult {

  const [photo, setPhoto] = useState<CameraPhoto>();

  if(!availableFeatures.getPhoto) {
    return {
      getPhoto: () => {throw new FeatureNotAvailableError()},
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

export const CameraHooks = {
  useCamera,
  availableFeatures
}
