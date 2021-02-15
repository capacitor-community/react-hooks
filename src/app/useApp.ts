import { useState, useEffect } from 'react';
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { isFeatureAvailable } from '../util/feature-check';
import { AvailableResult, notAvailable } from '../util/models';

interface URLOpenListenerEventResult extends AvailableResult { appUrlOpen?: string; }
interface AppStateResult extends AvailableResult { state?: boolean; }
interface LaunchUrlResult extends AvailableResult { launchUrl?: string; }

export const availableFeatures = {
  appState: isFeatureAvailable('App', 'state'),
  getLaunchUrl: isFeatureAvailable('App', 'getLaunchUrl'),
  appUrlOpen: isFeatureAvailable('App', 'appUrlOpen')
}

export function useAppState(): AppStateResult {
  if (!availableFeatures.appState) {
    return notAvailable
  }

  const [state, setAppState] = useState(true);

  useEffect(() => {

    const listener = App.addListener('appStateChange', async (state: AppState) => {
      setAppState(state.isActive);
    });

    return () => { listener.remove() }
  }, [App, setAppState]);

  return {
    state,
    isAvailable: true
  };
}

/**
 * Get the URL the app was originally launched with. Note: if
 * you want to detect future app opens, use `useAppUrlOpen` instead,
 * which will stay updated.
 */
export function useLaunchUrl(): LaunchUrlResult {
  if (!availableFeatures.getLaunchUrl) {
    return notAvailable;
  }

  const [launchUrl, setUrl] = useState<string | undefined>();

  useEffect(() => {
    async function getAppLaunchUrl() {
      const ret = await App.getLaunchUrl();
      setUrl(ret.url);
    }
    getAppLaunchUrl();
  }, [App, setUrl]);

  return {
    launchUrl,
    isAvailable: true
  }
}

export function useAppUrlOpen(): URLOpenListenerEventResult {
  if (!isFeatureAvailable('App', 'appUrlOpen')) {
    return notAvailable
  }

  const [appUrlOpen, setAppUrl] = useState<string>();

  useEffect(() => {
    const listener = App.addListener('appUrlOpen', async (state: URLOpenListenerEvent) => {
      setAppUrl(state.url);
    });
    return () => { listener.remove() }
  }, [App, setAppUrl]);

  return {
    appUrlOpen,
    isAvailable: true
  };
}
