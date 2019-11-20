import { useState, useEffect, useCallback } from 'react';
import { Plugins, GeolocationPosition, GeolocationOptions } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface GetCurrentPositionResult extends AvailableResult {
  error?: any,
  currentPosition?: GeolocationPosition
  getPosition: (options?: GeolocationOptions) => void
};

interface GeoWatchPositionResult extends AvailableResult {
  error?: any;
  currentPosition?: GeolocationPosition;
  startWatch: (options?: GeolocationOptions) => void;
  clearWatch: () => void;
};

const availableFeatures = {
  getCurrentPosition: isFeatureAvailable('Geolocation', 'getCurrentPosition'),
  watchPosition: isFeatureAvailable('Geolocation', 'watchPosition')
}

function useCurrentPosition(options?: GeolocationOptions): GetCurrentPositionResult {
  const { Geolocation } = Plugins;

  if (!availableFeatures.getCurrentPosition) {
    return {
      getPosition: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  }

  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState();

  const getPosition = useCallback(async (newOptions?: GeolocationOptions) => {
    try {
      const position = await Geolocation.getCurrentPosition(newOptions || options || {});
      setCurrentPosition(position);
    } catch (err) {
      setError(err);
    }
  }, [options]);

  useEffect(() => {
    getPosition(options);
  }, [getPosition, options]);

  return {
    error,
    currentPosition,
    getPosition,
    isAvailable: true
  }
}

function useWatchPosition(): GeoWatchPositionResult {
  const { Geolocation } = Plugins;
  
  if (!availableFeatures.watchPosition) {
    return {
      clearWatch: () => { throw new FeatureNotAvailableError() },
      startWatch: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    };
  }

  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition>();
  const [watchId, setWatchId] = useState('');
  const [error, setError] = useState();

  const clearWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      setWatchId('');
    }
  }

  const startWatch = (options?: GeolocationOptions) => {
    if (!watchId) {
      const id = Geolocation.watchPosition(options || {}, (pos: GeolocationPosition, err) => {
        if (err) {
          setError(err);
        }
        setCurrentPosition(pos);
      });
      setWatchId(id);
    }
  }

  return {
    error,
    currentPosition,
    clearWatch,
    startWatch,
    isAvailable: true
  };
}

export const GeolocationHooks = {
  useCurrentPosition,
  useWatchPosition,
  availableFeatures
}