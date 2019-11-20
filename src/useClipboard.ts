import { useState } from 'react';
import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable } from './util/feature-check';
const { Clipboard } = Plugins;

interface ClipboardResult extends AvailableResult {
  value?: string,
  getValue: () => void;
  setValue: (value: string) => void;
}

const availableFeatures = {
  useClipboard: isFeatureAvailable('Clipboard', 'useClipboard')
}

function useClipboard(): ClipboardResult {
  if (!(availableFeatures.useClipboard)) {
    return {
      getValue: () => { throw new FeatureNotAvailableError() },
      setValue: () => { throw new FeatureNotAvailableError() },
      ...notAvailable
    }
  }

  const [data, setData] = useState<string>();

  async function getValue() {
    const ret = await Clipboard.read({
      type: 'string'
    });

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

export const ClipboardHooks = {
  useClipboard,
  availableFeatures
}