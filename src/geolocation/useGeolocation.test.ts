jest.mock('@capacitor/geolocation', () => {
  let watchListener: any;

  let positions = [
    [43.0664229, -89.3978106],
    [43.0726269, -89.3807787],
    [43.0639252, -89.3879085],
    [43.0542669, -89.3788027]
  ];
  let position = positions[0];
  let pos = 0;

  return {
    Geolocation: {
      positions: positions,
      __updatePosition: () => {
        position = positions[++pos % positions.length];
        watchListener({
          timestamp: 1573676975,
          coords: {
            latitude: position[0],
            longitude: position[1],
            accuracy: 1
          }
        });
      },
      clearWatch: ({id}: { id: string }) => {
      },
      getCurrentPosition: async (options: PositionOptions) => (Promise.resolve({
        timestamp: 1573676975,
        coords: {
          latitude: position[0],
          longitude: position[1]
        }
      })),
      watchPosition: async (options: PositionOptions, cb: (pos: Position, err: any) => void) => {
        watchListener = cb;
        watchListener({
          timestamp: 1573676975,
          coords: {
            latitude: position[0],
            longitude: position[1],
            accuracy: 1
          }
        });

        return 'testid';
      }
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

import { Geolocation, PositionOptions, Position } from '@capacitor/geolocation';
import { useWatchPosition, useCurrentPosition } from './useGeolocation';
import { renderHook, act } from '@testing-library/react-hooks';

it('Gets current geolocation watch position', async () => {
  const r = renderHook(() => useWatchPosition());
  const geoMock = (Geolocation as any);

  function match(pos: Position, coords: [number, number]) {
    expect(pos).toMatchObject({
      coords: {
        latitude: coords[0],
        longitude: coords[1]
      }
    });
  }

  await act(async function () {
    r.result.current.startWatch();
  });

  await act(async function () {
    const { currentPosition } = r.result.current;
    match(currentPosition!, geoMock.positions[0]);
    (Geolocation as any).__updatePosition();
  });

  await act(async function () {
    const { currentPosition } = r.result.current;
    match(currentPosition!, geoMock.positions[1]);
    (Geolocation as any).__updatePosition();
  });

  await act(async function () {
    const { currentPosition } = r.result.current;
    match(currentPosition!, geoMock.positions[2]);
    (Geolocation as any).__updatePosition();
  });

  await act(async function () {
    const { currentPosition } = r.result.current;
    match(currentPosition!, geoMock.positions[3]);
    (Geolocation as any).__updatePosition();
  });

});

it('Gets current geolocation position', async () => {
  const r = renderHook(() => useCurrentPosition());
  const geoMock = (Geolocation as any);

  function match(pos: Position, coords: [number, number]) {
    expect(pos).toMatchObject({
      coords: {
        latitude: coords[0],
        longitude: coords[1]
      }
    });
  }

  await act(async function () {
    const { isAvailable } = r.result.current;
    expect(isAvailable).toBe(true);
  });

  await act(async function () {
    const { currentPosition } = r.result.current;
    match(currentPosition!, geoMock.positions[0]);
  });
});
