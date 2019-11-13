jest.mock('@capacitor/core', () => {
  let text = 'fake';

  return {
    Plugins: {
      Browser: {
        text: 'fake',
        open: async ({ url }: { url: string }) => {
          console.log('Opening url', url);
        },
        prefetch: async ({ urls }: { urls: string[] }) => {
          console.log('Prefetching urls', urls);
        },
        close: async () => {}
      }
    }
  }
});

import { useBrowser } from './useBrowser';

import { renderHook, act } from '@testing-library/react-hooks'

it('Opens url, closes, and prefetches', async () => {
  const { result } = renderHook(() => useBrowser());

  await act(async () => {
    const [open, close, prefetch] = result.current as any;
    await prefetch(['http://ionicframework.com']);
    await open('http://ionicframework.com');
    await close();
  });
});