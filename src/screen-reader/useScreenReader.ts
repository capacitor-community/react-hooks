import { useState, useEffect } from 'react';
import { ScreenReader } from '@capacitor/screen-reader';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';
import { AvailableResult, notAvailable } from '../util/models';

interface IsScreenReaderEnabledResult extends AvailableResult { isScreenReaderEnabled?: boolean; }
interface SpeakResult extends AvailableResult { speak: typeof ScreenReader.speak }

export const availableFeatures = {
  isScreenReaderAvailable: isFeatureAvailable('ScreenReader', 'isScreenReaderAvailable'),
  speak: isFeatureAvailable('ScreenReader', 'speak')
}

export function useIsScreenReaderEnabled(): IsScreenReaderEnabledResult {
  if(!availableFeatures.isScreenReaderAvailable) {
    return notAvailable;
  }

  const [isScreenReaderEnabled, setIsScreenReaderAvailable] = useState<boolean>();

  useEffect(() => {
    async function checkScreenReader() {
      const isEnabled = await ScreenReader.isEnabled();
      setIsScreenReaderAvailable(isEnabled.value);
    }
    if (availableFeatures.isScreenReaderAvailable) {
    checkScreenReader();
    }
  }, [ScreenReader, setIsScreenReaderAvailable]);

  return {
    isScreenReaderEnabled,
    isAvailable: true
  }
}

export function useSpeak(): SpeakResult {
  if(!availableFeatures.speak) {
    return {
      speak: featureNotAvailableError,
      ...notAvailable
    }
  }

  return {
    speak: ScreenReader.speak,
    isAvailable: true
  };
}
