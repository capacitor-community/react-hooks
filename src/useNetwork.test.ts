jest.mock('@capacitor/core', () => {
  let listener: any;
  const status = {
    "connected": true,
    "connectionType": "wifi"
  };
  return {
    Plugins: {
      Network: {
        __updateStatus: () => {
          status.connected = false;
          listener(status);
        },
        addListener: (eventName: string, cb: (status: NetworkStatus) => void) => {
          listener = cb;
          return { remove: () => { } }
        },
        getStatus: async () => {
          return status;
        },
      }
    },
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { Plugins, NetworkStatus } from '@capacitor/core';

import { NetworkHooks } from './useNetwork';
const { useStatus } = NetworkHooks

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets current network status', async () => {
  const r = renderHook(() => useStatus());

  const networkMock = (Plugins.Network as any);

  await act(async function () {
    const { isAvailable } = r.result.current;
    expect(isAvailable).toBe(true);
  });

  await act(async function () {
    const { networkStatus } = r.result.current;
    expect(networkStatus).toMatchObject({
      "connected": true,
      "connectionType": "wifi"
    });

    networkMock.__updateStatus();
  });

  await act(async function () {
    const {networkStatus} = r.result.current;

    expect(networkStatus).toMatchObject({
      "connected": false,
      "connectionType": "wifi"
    });
  });
});