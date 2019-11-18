import { Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable } from './util/feature-check';

interface OpenResult extends AvailableResult { open?: typeof Plugins.Browser.open }

export function useBrowserOpen(): OpenResult {

  if(!isFeatureAvailable('Browser', 'open')) {
    return notAvailable;
  }

  const { Browser } = Plugins;

  return {
    open: Browser.open,
    isAvailable: true
  };

}

interface PrefetchResult extends AvailableResult { prefetch?: typeof Plugins.Browser.prefetch }

export function useBrowserPrefetch(): PrefetchResult {

  if(!isFeatureAvailable('Browser', 'prefetch')) {
    return notAvailable;
  }

  const { Browser } = Plugins;

  return {
    prefetch: Browser.prefetch,
    isAvailable: true
  };

}

interface CloseResult extends AvailableResult { close?: typeof Plugins.Browser.close }

export function useBrowserClose(): CloseResult {

  if(!isFeatureAvailable('Browser', 'close')) {
    return notAvailable;
  }

  const { Browser } = Plugins;

  return {
    close: Browser.close,
    isAvailable: true
  }

}