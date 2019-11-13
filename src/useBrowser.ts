import { Plugins } from '@capacitor/core';

export function useBrowser() {
  const { Browser } = Plugins;

  async function open(url: string) {
    return Browser.open({
      url
    });
  }

  async function prefetch(urls: string[]) {
    return Browser.prefetch({
      urls
    });
  }

  async function close(url: string) {
    return Browser.close();
  }

  return [ open, close, prefetch ];
}