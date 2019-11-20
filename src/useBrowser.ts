import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface CloseResult extends AvailableResult { close: typeof Plugins.Browser.close }
interface OpenResult extends AvailableResult { open: typeof Plugins.Browser.open }
interface PrefetchResult extends AvailableResult { prefetch: typeof Plugins.Browser.prefetch }

const availableFeatures = {
  close: isFeatureAvailable('Browser', 'close'),
  open: isFeatureAvailable('Browser', 'open'),
  prefetch: isFeatureAvailable('Browser', 'prefetch')
}

function useClose(): CloseResult {
  const { Browser } = Plugins;

  if (!availableFeatures.open) {
    return {
      close: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  } 

  return {
    close: Browser.close,
    isAvailable: true
  }
}

function useOpen(): OpenResult {
  const { Browser } = Plugins;

  if (!availableFeatures.open) {
    return {
      open: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  }

  return {
    open: Browser.open,
    isAvailable: true
  };
}

function usePrefetch(): PrefetchResult {
  const { Browser } = Plugins;
  
  if (!availableFeatures.prefetch) {
    return {
      prefetch: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  }

  return {
    prefetch: Browser.prefetch,
    isAvailable: true
  };
}

export const BrowserHooks = {
  useClose,
  useOpen,
  usePrefetch,
  availableFeatures
}
