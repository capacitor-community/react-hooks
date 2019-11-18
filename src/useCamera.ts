import { Plugins, CameraOptions } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface CameraResult extends AvailableResult { getPhoto?: typeof Plugins.Camera.getPhoto };

export function useCameraGetPhoto(): CameraResult {

  if(!isFeatureAvailable('Camera', 'getPhoto')) {
    return notAvailable;
  }
  const { Camera } = Plugins;

  return {
    getPhoto: Camera.getPhoto,
    isAvailable: true
  };
}