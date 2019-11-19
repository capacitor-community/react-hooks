import { useState } from 'react';
import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
const { Clipboard } = Plugins;

interface ClipboardResult extends AvailableResult {
  data?: string,
  getClipboardData: () => void;
  setClipboardData: (value: string) => void;
}

const availableFeatures = {
  useClipboard: isFeatureAvailable('Clipboard', 'useClipboard')
}

function useClipboard(): ClipboardResult {
  if (!(availableFeatures.useClipboard)) {
    return {
      getClipboardData: () => { throw new FeatureNotAvailableError() },
      setClipboardData: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  }

  const [data, setData] = useState<string>();

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

export const ClipboardHooks = {
  useClipboard,
  availableFeatures
}