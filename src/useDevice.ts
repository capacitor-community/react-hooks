import { useState, useEffect } from 'react';
import { Plugins, DeviceInfo } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface GetInfoResult extends AvailableResult { info?: DeviceInfo };

export function useDeviceGetInfo(): GetInfoResult {

  if(!isFeatureAvailable('Device', 'getInfo')) {
    return notAvailable;
  }
  const { Device } = Plugins;
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

interface GetLanguageCodeResult extends AvailableResult { languageCode?: string };

export function useDeviceGetLanguageCode(): GetLanguageCodeResult {

  if(!isFeatureAvailable('Device', 'getLanguageCode')) {
    return notAvailable;
  }

  const { Device } = Plugins;
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