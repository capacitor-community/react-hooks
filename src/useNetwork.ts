import { useState, useEffect } from 'react';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
const { Network } = Plugins;

interface NetworkStatusResult extends AvailableResult { networkStatus?: NetworkStatus }

const availableFeatures = {
  getStatus: isFeatureAvailable('Network', 'getStatus')
};

function useStatus(): NetworkStatusResult {
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

export const NetworkHooks = {
  useStatus,
  availableFeatures
}