import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';

interface CloseResult extends AvailableResult {
  close: typeof Browser.close;
}
interface OpenResult extends AvailableResult {
  open: typeof Browser.open;
}

if (!Capacitor.isPluginAvailable('Browser')) {
  console.warn('The @capacitor/browser plugin was not found, did you forget to install it?');
}

export const availableFeatures = {
  close: isFeatureAvailable('Browser', 'close'),
  open: isFeatureAvailable('Browser', 'open'),
};

export function useClose(): CloseResult {
  if (!availableFeatures.close) {
    return {
      close: featureNotAvailableError,
      ...notAvailable,
    };
  }

  return {
    close: Browser.close,
    isAvailable: true,
  };
}

export function useOpen(): OpenResult {
  if (!availableFeatures.open) {
    return {
      open: featureNotAvailableError,
      ...notAvailable,
    };
  }

  return {
    open: Browser.open,
    isAvailable: true,
  };
}
