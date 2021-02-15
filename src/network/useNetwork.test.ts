jest.mock('@capacitor/network', () => {
  let listener: any;
  const status = {
    "connected": true,
    "connectionType": "wifi"
  };
  return {
    Network: {
      __updateStatus: () => {
        status.connected = false;
        listener(status);
      },
      addListener: (eventName: string, cb: (status: ConnectionStatus) => void) => {
        listener = cb;
        return { remove: () => { } }
      },
      getStatus: async () => {
        return status;
      },
    }
  }
});

jest.mock('@capacitor/core', () => {
  return {
    Capacitor: {
      isPluginAvailable: () => true,
      platform: 'ios'
    }
  }
});

import { Network, ConnectionStatus } from '@capacitor/network';

import { useStatus } from './useNetwork';
import { renderHook, act } from '@testing-library/react-hooks';

it('Gets current network status', async () => {
  const r = renderHook(() => useStatus());

  const networkMock = (Network as any);

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
