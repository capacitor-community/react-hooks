import { useState, useEffect } from 'react';

import { Plugins, DeviceInfo } from '@capacitor/core';

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
  }, [ Device, setInfo ]);


  useEffect(() => {
    async function getLanguageCode() {
      const data = await Device.getLanguageCode();
      setLanguageCode(data.value);
    }
    getLanguageCode();
  }, [ Device, setLanguageCode ]);

  return [ info, languageCode ];
}