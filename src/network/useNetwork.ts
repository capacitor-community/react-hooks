import { useState, useEffect } from 'react';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable } from '../util/feature-check';

interface NetworkStatusResult extends AvailableResult { networkStatus?: NetworkStatus }

export const availableFeatures = {
  getStatus: isFeatureAvailable('Network', 'getStatus')
};

export function useStatus(): NetworkStatusResult {
  const { Network } = Plugins;
  
  if(!availableFeatures.getStatus) {
    return notAvailable;
  }

  const [ networkStatus, setStatus ] = useState<NetworkStatus>();

  useEffect(() => {
    async function getStatus() {
      const status = await Network.getStatus();
      setStatus(status);
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
