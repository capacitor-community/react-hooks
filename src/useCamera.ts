import { useState, useEffect } from 'react';

import { Plugins, CameraOptions } from '@capacitor/core';

export function useCamera() {
  const { Camera } = Plugins;

  async function getPhoto(options: CameraOptions) {
    return Camera.getPhoto(options);
  }

  return getPhoto;
}