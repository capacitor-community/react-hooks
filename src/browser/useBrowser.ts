import { Browser } from '@capacitor/browser';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';

interface CloseResult extends AvailableResult { close: typeof Browser.close }
interface OpenResult extends AvailableResult { open: typeof Browser.open }

export const availableFeatures = {
  close: isFeatureAvailable('Browser', 'close'),
  open: isFeatureAvailable('Browser', 'open')
}

export function useClose(): CloseResult {
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
