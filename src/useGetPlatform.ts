import { Capacitor } from '@capacitor/core';
import { AvailableResult } from './util/models';

interface GetPlatformResult extends AvailableResult { platform: string };

export function useGetPlatform(): GetPlatformResult {

  return {
    platform: Capacitor.getPlatform(),
    isAvailable: true
  }

}