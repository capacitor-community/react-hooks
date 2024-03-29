import { useState } from 'react';
import { Clipboard } from '@capacitor/clipboard';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { Capacitor } from '@capacitor/core';

interface ClipboardResult extends AvailableResult {
  value?: string;
  getValue: () => void;
  setValue: (value: string) => void;
}

if (!Capacitor.isPluginAvailable('Clipboard')) {
  console.warn('The @capacitor/clipboard plugin was not found, did you forget to install it?');
}
export const availableFeatures = {
  useClipboard: isFeatureAvailable('Clipboard', 'useClipboard'),
};

export function useClipboard(): ClipboardResult {
  if (!availableFeatures.useClipboard) {
    return {
      getValue: featureNotAvailableError,
      setValue: featureNotAvailableError,
      ...notAvailable,
    };
  }

  const [data, setData] = useState<string>();

  async function getValue() {
    const ret = await Clipboard.read();

    setData(ret.value);
  }

  async function setValue(value: string) {
    await Clipboard.write({
      string: value,
    });
  }

  return {
    value: data,
    getValue,
    setValue,
    isAvailable: true,
  };
}
