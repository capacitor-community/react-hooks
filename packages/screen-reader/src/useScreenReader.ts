import { useState, useEffect } from 'react';
import { ScreenReader, ScreenReaderState } from '@capacitor/screen-reader';
import { Capacitor } from '@capacitor/core';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { AvailableResult, notAvailable } from './util/models';

interface IsScreenReaderEnabledResult extends AvailableResult {
  isScreenReaderEnabled?: boolean;
}
interface SpeakResult extends AvailableResult {
  speak: typeof ScreenReader.speak;
}

if (!Capacitor.isPluginAvailable('ScreenReader')) {
  console.warn(`The @capacitor/screen-reader plugin was not found, did you forget to install it?`);
}

export const availableFeatures = {
  isScreenReaderAvailable: isFeatureAvailable('ScreenReader', 'isEnabled'),
  speak: isFeatureAvailable('ScreenReader', 'speak'),
};

export function useIsScreenReaderEnabled(): IsScreenReaderEnabledResult {
  if (!availableFeatures.isScreenReaderAvailable) {
    return notAvailable;
  }

  const [isEnabled, setIsEnabled] = useState<boolean>();

  //set initial isEnabled state
  useEffect(() => {
    async function checkScreenReader() {
      const isEnabled = await ScreenReader.isEnabled();
      setIsEnabled(isEnabled.value);
    }
    if (availableFeatures.isScreenReaderAvailable) {
      checkScreenReader();
    }
  }, [ScreenReader, setIsEnabled]);

  //listen for state changes
  useEffect(() => {
    function checkScreenReader(state: ScreenReaderState) {
      setIsEnabled(state.value);
    }
    ScreenReader.addListener('stateChange', checkScreenReader);
    return () => {
      ScreenReader.removeAllListeners();
    };
  }, [ScreenReader, setIsEnabled]);

  return {
    isScreenReaderEnabled: isEnabled,
    isAvailable: true,
  };
}

export function useSpeak(): SpeakResult {
  if (!availableFeatures.speak) {
    return {
      speak: featureNotAvailableError,
      ...notAvailable,
    };
  }

  return {
    speak: ScreenReader.speak,
    isAvailable: true,
  };
}
