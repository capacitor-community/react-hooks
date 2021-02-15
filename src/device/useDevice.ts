import { useState, useEffect } from 'react';
import { Device, DeviceInfo } from '@capacitor/device';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable } from '../util/feature-check';

interface GetInfoResult extends AvailableResult { info?: DeviceInfo };
interface GetLanguageCodeResult extends AvailableResult { languageCode?: string };

export const availableFeatures = {
  getInfo: isFeatureAvailable('Device', 'getInfo'),
  getLanguageCode: isFeatureAvailable('Device', 'getLanguageCode')
}

export function useGetInfo(): GetInfoResult {
  if (!availableFeatures.getInfo) {
    return notAvailable;
  }
  const [info, setInfo] = useState<DeviceInfo>();

  useEffect(() => {
    async function getInfo() {
      const data = await Device.getInfo();
      setInfo(data);
    }
    getInfo();
  }, [Device, setInfo]);

  return {
    info,
    isAvailable: true
  }
}

export function useGetLanguageCode(): GetLanguageCodeResult {
  if (!availableFeatures.getLanguageCode) {
    return notAvailable;
  }

  const [languageCode, setLanguageCode] = useState<string>();

  useEffect(() => {
    async function getLanguageCode() {
      const data = await Device.getLanguageCode();
      setLanguageCode(data.value);
    }
    getLanguageCode();
  }, [Device, setLanguageCode]);

  return {
    languageCode,
    isAvailable: true
  };
}
