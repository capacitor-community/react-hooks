import { useState, useEffect } from 'react';
import { Plugins, AppState, AppUrlOpen } from '@capacitor/core';
import { isFeatureAvailable } from './util/feature-check';
import { AvailableResult, notAvailable } from './util/models';

interface AppStateResult extends AvailableResult { state?: boolean; };

export function useAppState(): AppStateResult {

  if (!isFeatureAvailable('App', 'state')) {
    return notAvailable
  }

  const { App } = Plugins;
  const [state, setAppState] = useState(true);

  useEffect(() => {
    const listener = App.addListener('appStateChange', async (state: AppState) => {
      setAppState(state.isActive);
    });

    return () => listener.remove();
  }, [App, setAppState]);

  return {
    state,
    isAvailable: true
  };
}

interface AppGetLaunchUrlResult extends AvailableResult { url?: string; };

/**
 * Get the URL the app was originally launched with. Note: if
 * you want to detect future app opens, use `useAppUrlOpen` instead,
 * which will stay updated.
 */
export function useAppGetLaunchUrl(): AppGetLaunchUrlResult {

  if (!isFeatureAvailable('App', 'getLaunchUrl')) {
    return notAvailable;
  }

  const { App } = Plugins;
  const [value, setValue] = useState();

  useEffect(() => {
    async function getAppLaunchUrl() {
      const ret = await App.getLaunchUrl();
      setValue(ret.url);
    }
    getAppLaunchUrl();
  }, [App, setValue]);

  return {
    url: value,
    isAvailable: true
  }
}

interface AppUrlOpenResult extends AvailableResult { url?: string; };

export function useAppUrlOpen(): AppUrlOpenResult {

  if(!isFeatureAvailable('App', 'appUrlOpen')) {
    return notAvailable
  }

  const { App } = Plugins;
  const [url, setAppUrl] = useState<string | undefined>();

  useEffect(() => {
    const listener = App.addListener('appUrlOpen', async (state: AppUrlOpen) => {
      setAppUrl(state.url);
    });
    return () => listener.remove();
  }, [App, setAppUrl]);

  return {
    url,
    isAvailable: true
  };
}
