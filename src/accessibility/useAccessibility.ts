import { useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';
import { AvailableResult, notAvailable } from '../util/models';

interface IsScreenReaderEnabledResult extends AvailableResult { isScreenReaderEnabled?: boolean; }
interface SpeakResult extends AvailableResult { speak: typeof Plugins.Accessibility.speak; }

export const availableFeatures = {
  isScreenReaderAvailable: isFeatureAvailable('Accessibility', 'isScreenReaderAvailable'),
  speak: isFeatureAvailable('Accessibility', 'speak')
}

export function useIsScreenReaderEnabled(): IsScreenReaderEnabledResult {
  const { Accessibility } = Plugins;

  if(!availableFeatures.isScreenReaderAvailable) {
    return notAvailable;
  }

  const [isScreenReaderEnabled, setIsScreenReaderAvailable] = useState<boolean>();

  useEffect(() => {
    async function checkScreenReader() {
      const isEnabled = await Accessibility.isScreenReaderEnabled();
      setIsScreenReaderAvailable(isEnabled.value);
    }
    if (availableFeatures.isScreenReaderAvailable) {
    checkScreenReader();
    }
  }, [Accessibility, setIsScreenReaderAvailable]);

  return {
    isScreenReaderEnabled,
    isAvailable: true
  }
}

export function useSpeak(): SpeakResult {
  const { Accessibility } = Plugins;
  if(!availableFeatures.speak) {
    return {
      speak: featureNotAvailableError,
      ...notAvailable
    }
  }

  return {
    speak: Accessibility.speak,
    isAvailable: true
  };
}
