import { Capacitor } from '@capacitor/core';
import { AvailableResult } from './util/models';

interface PlatformResult extends AvailableResult { platform: string };

function usePlatform(): PlatformResult {
  return {
    platform: Capacitor.getPlatform(),
    isAvailable: true
  }
}

export const PlatformHooks = {
  usePlatform,
  availableFeatures: {
    getPlatform: true
  }
};