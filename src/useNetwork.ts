import { useState, useEffect } from 'react';

import { Plugins, NetworkStatus } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface NetworkStatusResult extends AvailableResult { networkStatus?: NetworkStatus }

export function useNetwork(): NetworkStatusResult {

  if(!isFeatureAvailable('Network', 'getStatus')) {
    return notAvailable;
  }

  const { Network } = Plugins;
  const [ networkStatus, setStatus ] = useState<NetworkStatus>();

  useEffect(() => {
    async function getStatus() {
      const s = await Network.getStatus();
      setStatus(s);
    }
    getStatus();
  }, [ Network, setStatus ]);

  useEffect(() => {
    const listener = Network.addListener('networkStatusChange', (status: NetworkStatus) => {
      setStatus(status);
    });

    return () => listener.remove()
  }, [ Network, setStatus ]);

  return {
    networkStatus,
    isAvailable: true
  }
}