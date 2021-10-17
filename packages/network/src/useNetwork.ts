import { useState, useEffect } from 'react';
import { Network, ConnectionStatus } from '@capacitor/network';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
import { Capacitor } from '@capacitor/core';

interface NetworkStatusResult extends AvailableResult {
  networkStatus?: ConnectionStatus;
}

export const availableFeatures = {
  getStatus: isFeatureAvailable('Network', 'getStatus'),
};

if (!Capacitor.isPluginAvailable('Network')) {
  console.warn('The @capacitor/network plugin was not found, did you forget to install it?');
}

export function useStatus(): NetworkStatusResult {
  if (!availableFeatures.getStatus) {
    return notAvailable;
  }

  const [networkStatus, setStatus] = useState<ConnectionStatus>();

  useEffect(() => {
    async function getStatus() {
      const status = await Network.getStatus();
      setStatus(status);
    }
    getStatus();
  }, [Network, setStatus]);

  useEffect(() => {
    const listener = Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      setStatus(status);
    });

    return () => {
      listener.remove();
    };
  }, [Network, setStatus]);

  return {
    networkStatus,
    isAvailable: true,
  };
}
