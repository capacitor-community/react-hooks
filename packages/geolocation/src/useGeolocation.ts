import { useState, useEffect } from 'react';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';

interface GetCurrentPositionResult extends AvailableResult {
  error?: any;
  currentPosition?: Position;
  getPosition: (options?: PositionOptions) => void;
}

interface GeoWatchPositionResult extends AvailableResult {
  error?: any;
  currentPosition?: Position;
  startWatch: (options?: PositionOptions) => void;
  clearWatch: () => void;
}

export const availableFeatures = {
  getCurrentPosition: isFeatureAvailable('Geolocation', 'getCurrentPosition'),
  watchPosition: isFeatureAvailable('Geolocation', 'watchPosition'),
};

export function useCurrentPosition(
  options?: PositionOptions,
  manual = false
): GetCurrentPositionResult {
  if (!availableFeatures.getCurrentPosition) {
    return {
      getPosition: featureNotAvailableError,
      ...notAvailable,
    };
  }

  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [error, setError] = useState();

  const getPosition = async (newOptions?: PositionOptions) => {
    let called = false;

    // we use watchPosition here and grab the first result because getCurrentPosition currently has some issues
    const id = await Geolocation.watchPosition(
      newOptions || options || {},
      (pos: Position | null, err) => {
        // watchPosition will sometimes fire updates quickly,
        // so we check here to make sure its only called one per getPosition invocation
        if (!called) {
          if (err) {
            setError(err);
          }

          if (pos) {
            setCurrentPosition(pos);
            called = true;
            // run on next tick so id will be defined
            setTimeout(() => Geolocation.clearWatch({ id }), 0);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (!manual) getPosition(options);
  }, [options, manual]);

  return {
    error,
    currentPosition,
    getPosition,
    isAvailable: true,
  };
}

export function useWatchPosition(): GeoWatchPositionResult {
  if (!availableFeatures.watchPosition) {
    return {
      clearWatch: featureNotAvailableError,
      startWatch: featureNotAvailableError,
      ...notAvailable,
    };
  }

  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [watchId, setWatchId] = useState('');
  const [error, setError] = useState();

  const clearWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      setWatchId('');
    }
  };

  const startWatch = async (options?: PositionOptions) => {
    if (!watchId) {
      const id = await Geolocation.watchPosition(options || {}, (pos: Position | null, err) => {
        if (err) {
          setError(err);
        }
        if (pos) {
          setCurrentPosition(pos);
        }
      });
      setWatchId(id);
    }
  };

  return {
    error,
    currentPosition,
    clearWatch,
    startWatch,
    isAvailable: true,
  };
}
