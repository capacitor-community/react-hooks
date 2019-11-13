import { useState, useEffect } from 'react';

import { Plugins, AppState, AppUrlOpen } from '@capacitor/core';

export function useAppState() {
  const { App } = Plugins;

  const [ state, setAppState ] = useState(true);

  useEffect(() => {
    const listener = App.addListener('appStateChange', async (state: AppState) => {
      setAppState(state.isActive);
    });

    return () => listener.remove();
  }, [setAppState]);

  return state;
}

/**
 * Get the URL the app was originally launched with. Note: if
 * you want to detect future app opens, use `useAppUrlOpen` instead,
 * which will stay updated.
 */
export function useAppLaunchUrl() {
  const { App } = Plugins;

  const [ value, setValue ] = useState('');

  useEffect(() => {
    async function getAppLaunchUrl() {
      const ret = await App.getLaunchUrl();

      setValue(ret.url);
    }
    getAppLaunchUrl();
  }, [ setValue ]);

  return value;
}

export function useAppUrlOpen() {
  const { App } = Plugins;

  const [ url, setAppUrl ] = useState<string | null>(null);

  useEffect(() => {
    const listener = App.addListener('appUrlOpen', async (state: AppUrlOpen) => {
      setAppUrl(state.url);
    });

    return () => listener.remove();
  }, [setAppUrl]);

  return url;
}
