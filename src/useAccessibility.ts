import { useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import { isFeatureAvailable } from './util/feature-check';
import { AvailableResult, notAvailable } from './util/models';


interface IsScreenReaderEnabledResult extends AvailableResult { isScreenReaderEnabled?: boolean };

export function useAccessibilityIsScreenReaderEnabled(): IsScreenReaderEnabledResult {
  
  if (!isFeatureAvailable('Accessibility', 'isScreenReaderAvailable')) {
    return notAvailable;
  }

  const { Accessibility } = Plugins;

  const [state, setState] = useState<IsScreenReaderEnabledResult>({ isScreenReaderEnabled: undefined, isAvailable: undefined });

  useEffect(() => {
    async function checkScreenReader() {
      try {
        const isEnabled = await Accessibility.isScreenReaderEnabled();
        setState({
          isScreenReaderEnabled: isEnabled.value,
          isAvailable: true
        });
      } catch {
        setState({
          isAvailable: false
        });
      }
    }
    checkScreenReader();
  }, [Accessibility, setState]);

  useEffect(() => {
    const listener = Accessibility.addListener('accessibilityScreenReaderStateChange', async () => {
      const isEnabled = await Accessibility.isScreenReaderEnabled();
      setState({
        isScreenReaderEnabled: isEnabled.value,
        isAvailable: state.isAvailable
      })
    });

    return () => listener.remove();
  }, [Accessibility, setState]);

  return state;

}

interface SpeakResult extends AvailableResult { speak?: typeof Plugins.Accessibility.speak };

export function useAccessibilitySpeak(): SpeakResult {

  if (!isFeatureAvailable('Accessibility', 'speak')) {
    return notAvailable;
  }

  const { Accessibility } = Plugins;

  return {
    speak: Accessibility.speak,
    isAvailable: true
  };

}