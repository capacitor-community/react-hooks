import { useState, useEffect } from 'react';

import { Plugins, GeolocationPosition, GeolocationOptions } from '@capacitor/core';

export function useGeolocation(options?: GeolocationOptions) {
  const { Geolocation } = Plugins;

  const [ currentPosition, setCurrentPosition ] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(options || {}, (pos: GeolocationPosition, err: any) => {
      setCurrentPosition(pos);
    });

    return () => { Geolocation.clearWatch({ id: watchId }) };
  }, [ Geolocation, setCurrentPosition, options ]);

  return currentPosition;
}