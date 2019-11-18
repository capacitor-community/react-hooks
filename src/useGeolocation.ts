import { useState, useEffect } from 'react';

import { Plugins, GeolocationPosition, GeolocationOptions } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface GetCurrentPositionResult extends AvailableResult { currentPosition?: GeolocationPosition };

export function useGeoCurrentPosition(options?: GeolocationOptions): GetCurrentPositionResult {
  if (!isFeatureAvailable('Geolocation', 'getCurrentPosition')) {
    return notAvailable;
  }

  const { Geolocation } = Plugins;
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>();

  useEffect(() => {

    (async () => {
      const position = await Geolocation.getCurrentPosition(options || {});
      setCurrentPosition(position);
    })();

  }, [Geolocation, setCurrentPosition, options]);

  return {
    currentPosition,
    isAvailable: true
  }

}

interface GeoWatchPositionResult extends AvailableResult {
  currentPosition?: GeolocationPosition;
  clearWatch?: () => void;
};

export function useGeoWatchPosition(options?: GeolocationOptions): GeoWatchPositionResult {

  if (!isFeatureAvailable('Geolocation', 'watchPosition')) {
    return notAvailable;
  }

  const { Geolocation } = Plugins;
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>();
  const [clearWatch, setClearWatch] = useState<() => void>();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(options || {}, (pos: GeolocationPosition) => {
      setCurrentPosition(pos);
    });
    setClearWatch(() => Geolocation.clearWatch({ id: watchId }));
    return () => { clearWatch && clearWatch() };
  }, [Geolocation, setCurrentPosition, options]);

  return {
    currentPosition,
    clearWatch,
    isAvailable: true
  };
}