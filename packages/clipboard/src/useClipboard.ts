import { useState } from 'react';
import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from '../util/models';
import { isFeatureAvailable, featureNotAvailableError } from '../util/feature-check';

interface ClipboardResult extends AvailableResult {
  value?: string,
  getValue: () => void;
  setValue: (value: string) => void;
}

export const availableFeatures = {
  useClipboard: isFeatureAvailable('Clipboard', 'useClipboard')
}

export function useClipboard(): ClipboardResult {
  const { Clipboard } = Plugins;
  
  if (!(availableFeatures.useClipboard)) {
    return {
      getValue: featureNotAvailableError,
      setValue: featureNotAvailableError,
      ...notAvailable
    }
  }

  const [data, setData] = useState<string>();

  async function getValue() {
    const ret = await Clipboard.read();

    setData(ret.value);
  }

  async function setValue(value: string) {
    await Clipboard.write({
      string: value
    });
  }

  return {
    value: data,
    getValue,
    setValue,
    isAvailable: true
  }
}
