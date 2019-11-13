import { useState, useEffect } from 'react';

import { Plugins, NetworkStatus } from '@capacitor/core';

export function useNetwork() {
  const { Network } = Plugins;

  const [ networkStatus, setStatus ] = useState<NetworkStatus | null>(null);

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

  return networkStatus;
}