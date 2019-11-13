import { useState } from 'react';

import { Plugins } from '@capacitor/core';

export function useClipboard() {
  const { Clipboard } = Plugins;

  const [ data, setString ] = useState('');

  async function getClipboardData() {
    const ret = await Clipboard.read({
      type: 'string'
    });

    setString(ret.value);
  }

  async function setClipboardData(value: string) {
    await Clipboard.write({
      string: value
    });
  }

  return [data, getClipboardData, setClipboardData];
}