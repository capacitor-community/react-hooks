import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';

import { isFeatureAvailable } from './util/feature-check';
import { useEffect, useState } from 'react';

interface AppUrlOpenResult extends AvailableResult {
  appUrlOpen?: string;
}
interface AppStateResult extends AvailableResult {
  state?: boolean;
}
interface LaunchUrlResult extends AvailableResult {
  launchUrl?: string;
}

export const availableFeatures = {
  appState: isFeatureAvailable('App', 'state'),
  getLaunchUrl: isFeatureAvailable('App', 'getLaunchUrl'),
  appUrlOpen: isFeatureAvailable('App', 'appUrlOpen'),
};

if (!Capacitor.isPluginAvailable('App')) {
  console.warn('The @capacitor/app plugin was not found, did you forget to install it?');
}

export function useAppState(): AppStateResult {
  if (!availableFeatures.appState) {
    return notAvailable;
  }

  const [state, setAppState] = useState(true);

  useEffect(() => {
    const listener = App.addListener('appStateChange', async (state: AppState) => {
      setAppState(state.isActive);
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      listener && listener.remove && listener.remove().catch(() => {});
    };
  }, [App, setAppState]);

  return {
    state,
    isAvailable: true,
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

  const [launchUrl, setUrl] = useState<string>();

  useEffect(() => {
    async function getAppLaunchUrl() {
      const ret = await App.getLaunchUrl();
      setUrl(ret?.url);
    }
    getAppLaunchUrl();
  }, [App, setUrl]);

  return {
    launchUrl,
    isAvailable: true,
  };
}

export function useAppUrlOpen(): AppUrlOpenResult {
  if (!isFeatureAvailable('App', 'appUrlOpen')) {
    return notAvailable;
  }

  const [appUrlOpen, setAppUrl] = useState<string>();

  useEffect(() => {
    const listener = App.addListener('appUrlOpen', async (state: URLOpenListenerEvent) => {
      setAppUrl(state.url);
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      listener && listener.remove && listener.remove().catch(() => {});
    };
  }, [App, setAppUrl]);

  return {
    appUrlOpen,
    isAvailable: true,
  };
}
