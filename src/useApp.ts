import { useState, useEffect } from 'react';
import { Plugins, AppState, AppUrlOpen } from '@capacitor/core';
import { isFeatureAvailable } from './util/feature-check';
import { AvailableResult, notAvailable } from './util/models';
const { App } = Plugins;

interface AppUrlOpenResult extends AvailableResult { appUrlOpen?: string; };
interface AppStateResult extends AvailableResult { state?: boolean; };
interface LaunchUrlResult extends AvailableResult { launchUrl?: string; };

const availableFeatures = {
  appState: isFeatureAvailable('App', 'state'),
  getLaunchUrl: isFeatureAvailable('App', 'getLaunchUrl'),
  appUrlOpen: isFeatureAvailable('App', 'appUrlOpen')
}

function useAppState(): AppStateResult {

  if (!availableFeatures.appState) {
    return notAvailable
  }

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

/**
 * Get the URL the app was originally launched with. Note: if
 * you want to detect future app opens, use `useAppUrlOpen` instead,
 * which will stay updated.
 */
function useLaunchUrl(): LaunchUrlResult {

  if (!availableFeatures.getLaunchUrl) {
    return notAvailable;
  }

  const [launchUrl, setUrl] = useState();

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

function useAppUrlOpen(): AppUrlOpenResult {

  if (!isFeatureAvailable('App', 'appUrlOpen')) {
    return notAvailable
  }

  const { App } = Plugins;
  const [appUrlOpen, setAppUrl] = useState<string>();

  useEffect(() => {
    const listener = App.addListener('appUrlOpen', async (state: AppUrlOpen) => {
      setAppUrl(state.url);
    });
    return () => listener.remove();
  }, [App, setAppUrl]);

  return {
    appUrlOpen,
    isAvailable: true
  };
}

export const AppHooks = {
  useAppState,
  useLaunchUrl,
  useAppUrlOpen,
  availableFeatures
}
