import { useState, useEffect, useCallback } from 'react';

import { Plugins, GeolocationPosition, GeolocationOptions, GeolocationWatchCallback } from '@capacitor/core';

export function useGeolocation(options?: GeolocationOptions) {
  const { Geolocation } = Plugins;

  const [ currentPosition, setCurrentPosition ] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    async function watchPosition() {
      const pos = await Geolocation.watchPosition(options || {}, (pos: GeolocationPosition, err: any) => {
        setCurrentPosition(pos);
      });
    }
    watchPosition();
  }, [setCurrentPosition]);

  return [ currentPosition ];
}