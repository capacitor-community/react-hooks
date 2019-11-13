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
          return { remove: () => {} }
        },
        getStatus: async () => {
          return status;
        },
      }
    }
  }
});

import { Plugins, GeolocationOptions, GeolocationPosition, NetworkStatus } from '@capacitor/core';

import { useNetwork } from './useNetwork';

import { renderHook, act } from '@testing-library/react-hooks'

it('Gets current network status', async () => {
  let r: any;
  await act(async () => {
    r = renderHook(() => useNetwork());
  })
  const networkMock = (Plugins.Network as any);

  await act(async function() {
    const status = r.result.current;

    expect(status).toMatchObject({
      "connected": true,
      "connectionType": "wifi"
    });

    networkMock.__updateStatus();
  });

  await act(async function() {
    const status = r.result.current as any;

    expect(status).toMatchObject({
      "connected": false,
      "connectionType": "wifi"
    });
  });
});