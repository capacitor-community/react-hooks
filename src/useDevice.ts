import { useState, useEffect } from 'react';

import { Plugins, CameraOptions, DeviceInfo, DeviceLanguageCodeResult } from '@capacitor/core';

export function useDevice() {
  const { Device } = Plugins;

  const [ info, setInfo ] = useState<DeviceInfo | null>(null);
  const [ languageCode, setLanguageCode ] = useState<string | null>(null);

  useEffect(() => {
    async function getInfo() {
      const data = await Device.getInfo();
      setInfo(data);
    }
    getInfo();
  }, [setInfo]);


  useEffect(() => {
    async function getLanguageCode() {
      const data = await Device.getLanguageCode();
      setLanguageCode(data.value);
    }
    getLanguageCode();
  }, [setLanguageCode]);

  return [ info, languageCode ];
}