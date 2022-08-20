import { Capacitor } from '@capacitor/core';
import { FeatureNotAvailableError } from './models';

const allTrue = {
  web: true,
  ios: true,
  android: true,
  electron: true,
};

const featureMap = {
  Preferences: {
    usePreferences: allTrue,
  },
};

export function isFeatureAvailable<
  T extends typeof featureMap,
  PluginKeys extends keyof NonNullable<T>,
  FeatureKeys extends keyof NonNullable<NonNullable<T>[PluginKeys]>
>(plugin: PluginKeys, method: FeatureKeys): boolean {
  const isPluginAvailable = Capacitor.isPluginAvailable(plugin as string);
  const isFeatureSupported = (featureMap as any)[plugin][method][Capacitor.getPlatform()];
  if (isPluginAvailable && !!isFeatureSupported) {
    return true;
  }
  return false;
}

export function featureNotAvailableError(): any {
  throw new FeatureNotAvailableError();
}
