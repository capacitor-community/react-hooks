import { useState } from 'react';

import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface ClipboardResult extends AvailableResult {
  data?: string,
  getClipboardData?: () => void;
  setClipboardData?: (value: string) => void;
}

export function useClipboard(): ClipboardResult {

  if(!(isFeatureAvailable('Clipboard', 'read') || !isFeatureAvailable('Clipboard', 'write'))) {
    return notAvailable;
  }

  const { Clipboard } = Plugins;

  const [ data, setData ] = useState('');

  async function getClipboardData() {
    const ret = await Clipboard.read({
      type: 'string'
    });

    setData(ret.value);
  }

  async function setClipboardData(value: string) {
    await Clipboard.write({
      string: value
    });
  }

  return {
    data,
    getClipboardData,
    setClipboardData,
    isAvailable: true
  }
}