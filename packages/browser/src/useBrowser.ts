import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';

interface CloseResult extends AvailableResult { close: typeof Plugins.Browser.close }
interface OpenResult extends AvailableResult { open: typeof Plugins.Browser.open }
interface PrefetchResult extends AvailableResult { prefetch: typeof Plugins.Browser.prefetch }

export const availableFeatures = {
  close: isFeatureAvailable('Browser', 'close'),
  open: isFeatureAvailable('Browser', 'open'),
  prefetch: isFeatureAvailable('Browser', 'prefetch')
}

export function useClose(): CloseResult {
  const { Browser } = Plugins;

  if (!availableFeatures.close) {
    return {
      close: featureNotAvailableError,
      ...notAvailable
    }
  } 

  return {
    close: Browser.close,
    isAvailable: true
  }
}

export function useOpen(): OpenResult {
  const { Browser } = Plugins;

  if (!availableFeatures.open) {
    return {
      open: featureNotAvailableError,
      ...notAvailable
    }
  }

  return {
    open: Browser.open,
    isAvailable: true
  };
}

export function usePrefetch(): PrefetchResult {
  const { Browser } = Plugins;
  
  if (!availableFeatures.prefetch) {
    return {
      prefetch: featureNotAvailableError,
      ...notAvailable
    }
  }

  return {
    prefetch: Browser.prefetch,
    isAvailable: true
  };
}
