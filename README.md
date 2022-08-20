<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Capacitor React Hooks</h3>

<p align="center">
  A set of hooks to help Capacitor developers use native <a href="http://capacitorjs.com/" target="_blank"
  >Capacitor APIs</a>.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
  <a href="https://github.com/capacitor-community/react-hooks/actions?query=workflow%CI"><img src="https://img.shields.io/github/workflow/status/capacitor-community/react-hooks/CI?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/react-hooks"><img src="https://img.shields.io/npm/l/@capacitor-community/react-hooks?style=flat-square" /></a>
<br>
 <img src="https://img.shields.io/badge/capacitor%20v3%20support-yes-brightgreen?logo=Capacitor&style=flat-square" />
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-6-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer | GitHub                                  | Social                                    |
| ---------- | --------------------------------------- | ----------------------------------------- |
| Ely Lucas  | [elylucas](https://github.com/elylucas) | [@elylucas](https://twitter.com/elylucas) |

> These docs are for Capacitor 3 plugins. For docs that target v2 plugins, see the [capv2](https://github.com/capacitor-community/react-hooks/tree/capv2) branch.

## Getting Started

To start using Capacitor Hooks in your app, you install the React Hook package along with the Capacitor plugin you want to use. Here is an example of using the Storage plugin along with it's React hook:

```bash
# Install the Capacitor Plugin
npm install @capacitor/storage
# And then the React hook package:
npm install @capacitor-community/storage-react
```

Import the hooks:

```jsx
import { useStorage } from '@capacitor-community/storage-react';
```

Then use the hooks in your app:

```jsx
const [value, setValue] = useStorage('mykey');
```

## Feature Detection

While Capacitor allows you to write to one API across several platforms, not all features are supported on all platforms. It is encouraged to check if the feature you intend to use is available before using it to avoid any runtime errors.

Each of the hook plugin paths exports an `availableFeatures` object, which contains a list features for that plugin. If the feature is supported for the current platform the app is running on, that feature will be true:

```jsx
const { useStorageItem, availableFeatures } = `@capacitor-community/storage-react`;
const [value, setValue] = useStorage('mykey');
...
if(availableFeatures.useStorage) {
  // Storage is available, feel free to use it!
  setValue('cake');
}
```

# Upgrading from Capacitor 2 React Hooks

In Capacitor 3, all the plugins were separated into their own packages. Likewise, the new React hooks plugins were also put into their own package, so you will need to install the hook for each plugin you use.

Any deprecated API'S from Capacitor 2 to 3 were also removed and updated, so you might need to make some modifications to account for API changes. See the [Capacitor Plugin API for](https://capacitorjs.com/docs/plugins) to learn more.

# Hook Usage

## @capacitor/app Hooks

Installation:

```bash
npm install @capacitor-community/app-react
```

Usage:

```jsx
import {
  useAppState,
  useAppUrlOpen,
  useLaunchUrl,
  availableFeatures,
} from '@capacitor-community/app-react';
```

`useAppState` provides access to App status information, such as whether the app is active or inactive. This value will update dynamically.

```jsx
const { state } = useAppState();
```

#### `useLaunchUrl`

`useLaunchUrl` provides the URL the app was initially launched with. If you'd like to track future inbound URL events, use `useAppUrlOpen` below instead.

```jsx
const { launchUrl } = useLaunchUrl();
```

#### `useAppUrlOpen`

`useAppUrlOpen` provides the most recent URL used to activate the app. For example, if the user followed a link in another app that opened your app.

```jsx
const { appUrlOpen } = useAppUrlOpen();
```

See the [App](https://capacitorjs.com/docs/apis/app) Capacitor Plugin docs for more info on the plugin API.

## @capcitor/browser Hooks

Installation:

```bash
npm install @capacitor-community/browser-react
```

Usage:

```jsx
import { useClose, useOpen, availableFeatures } from '@capacitor-community/browser-react';
```

`useOpen`, `useClose` provides a way to launch, and close an in-app browser for external content:

```jsx
// Open url in browser
const { open } = useOpen();

open({ url: 'http://ionicframework.com' });

// Close url in browser
const { close } = useClose();
useClose();
```

See the [Browser](https://capacitorjs.com/docs/apis/browser) Capacitor Plugin docs for more info on the plugin API.

## @capacitor/camera Hooks

Installation:

```bash
npm install @capacitor-community/camera-react
```

Usage:

```jsx
import { useCamera, availableFeatures } from '@capacitor-community/camera-react';
```

`useCamera` provides a way to take a photo:

```jsx
const { photo, getPhoto } = useCamera();
const triggerCamera = useCallback(async () => {
  getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
  });
}, [getPhoto]);

<div>{photo && <img alt="" src={photo.dataUrl} />}</div>;
```

See the [Camera](https://capacitorjs.com/docs/apis/camera) Capacitor Plugin docs for more info on the plugin API.

## Clipboard Hooks

Installation:

```bash
npm install @capacitor-community/clipboard-react
```

Usage:

```jsx
import { useClipboard, availableFeatures } from '@capacitor-community/clipboard-react';
```

`useClipboard` reads and writes clipboard data:

```jsx
const { value, getValue, setValue } = useClipboard();

const paste = useCallback(async () => {
  await setValue('http://ionicframework.com/);
}, [setValue]);

const copy = useCallback(async () => {
  getValue();
}, [getValue])
```

See the [Clipboard](https://capacitorjs.com/docs/apis/clipboard) Capacitor Plugin docs for more info on the plugin API.

## Device Hooks

Installation:

```bash
npm install @capacitor-community/device-react
```

Usage:

```jsx
import {
  useGetInfo,
  useGetLanguageCode,
  availableFeatures,
} from '@capacitor-community/device-react';
```

`useGetInfo`, `useGetLanguageCode` gives access to device information and device language settings:

```jsx
const { info } = useGetInfo();
const { languageCode } = useGetLanguageCode();
```

See the [Device](https://capacitorjs.com/docs/apis/device) Capacitor Plugin docs for more info on the plugin API.

## Filesystem Hooks

Installation:

```bash
npm install @capacitor-community/filesystem-react
```

Usage:

```jsx
import {
  useFilesystem,
  base64FromPath,
  availableFeatures,
} from '@capacitor-community/filesystem-react';
```

`useFilesystem` returns back common methods to gain access to file system apis.

```jsx
const { readFile } = useFilesystem();

const file = await readFile({
  path: filepath,
  directory: FilesystemDirectory.Data,
});
```

`base64FromPath` is a helper method that will take in a path to a file and return back the base64 encoded representation of that file.

See the [Filesystem](https://capacitorjs.com/docs/apis/filesystem) Capacitor Plugin docs for more info on the plugin API.

```jsx
const base64String = await base64FromPath(path);
```

## Geolocation Hooks

Installation:

```bash
npm install @capacitor-community/geolocation-react
```

Usage:

```jsx
import {
  useCurrentPosition,
  useWatchPosition,
  availableFeatures,
} from '@capacitor-community/geolocation-react';
```

`useCurrentPosition` returns a single geolocation position using the Geolocation API in Capacitor. The position can be manually updated by calling `getPosition`:

```jsx
const { currentPosition, getPosition } = useCurrentPosition();

const handleRefreshPosition = () => {
  getPosition();
};
```

`useWatchPosition` tracks a geolocation position using the `watchPosition` in the Geolocation API in Capacitor. The location will automatically begin updating, and you can use the `clearWatch` and `startWatch` methods to manually stop and restart the watch.

```jsx
const { currentPosition, startWatch, clearWatch } = useWatchPosition();
```

See the [Geolocation](https://capacitorjs.com/docs/apis/geolocation) Capacitor Plugin docs for more info on the plugin API.

## Keyboard Hooks

Installation:

```bash
npm install @capacitor-community/keyboard-react
```

Usage:

```jsx
import { useKeyboardState } from '@capacitor-community/keyboard';
```

`useKeyboard` returns whether or not the on-screen keyboard is shown as well as an approximation of the keyboard height in pixels.

```jsx
const { isOpen, keyboardHeight } = useKeyboard();
// Use keyboardHeight to translate an input that would otherwise be hidden by the keyboard
```

See the [Keyboard](https://capacitorjs.com/docs/apis/keyboard) Capacitor Plugin docs for more info on the plugin API.

## Network Hooks

Installation:

```bash
npm install @capacitor-community/network-react
```

Usage:

```jsx
import { useStatus, availableFeatures } from '@capacitor-community/network-react';
```

`useStatus` monitors network status and information:

```jsx
const { networkStatus } = useStatus();
```

See the [Network](https://capacitorjs.com/docs/apis/network) Capacitor Plugin docs for more info on the plugin API.

## ScreenReader Hooks

Installation:

```bash
npm install @capacitor-community/screen-reader-react
```

Usage:

```jsx
import {
  useIsScreenReaderEnabled,
  useSpeak,
  availableFeatures,
} from '@capacitor-community/screen-reader-react';
```

`useIsScreenReaderEnabled` provides access to detecting and responding to a screen reading device or OS setting being enabled:

```jsx
const { isScreenReaderEnabled } = useIsScreenReaderEnabled();
```

`useSpeak` activates a text-to-speech engine (if available) to read spoken text.

```jsx
const { speak } = useSpeak();
speak({ value: textToSpeak });
```

See the [ScreenReader](https://capacitorjs.com/docs/apis/screenreader) Capacitor Plugin docs for more info on the plugin API.

## Storage Hooks

Installation:

```bash
npm install @capacitor-community/storage-react
```

Usage:

```jsx
import { useStorage, useStorageItem, availableFeatures } from '@capacitor-community/storage-react';
```

`useStorage` provides access to Capacitor's storage engine. There is also a helper called `useStorageItem` which makes managing a single item easy if you don't need to access the full Storage API (see below)

```jsx
const { get, set, remove, getKeys, clear } = useStorage();
useEffect(() => {
  async function example() {
    const value = await get('name');
    await set('name', 'Max');
    await remove('name');
    const allKeys = await getKeys();
    await clear();
  }
}, [get, set, remove, keys, clear]);
```

### `useStorageItem`

`useStorageItem` tracks a single item and provides a nice way to read and write that item:

```jsx
const [name, setName] = useStorageItem('name', 'Max');

// Example:
const updateName = useCallback(
  (n) => {
    setName(n);
  },
  [setName]
);
```

`useStorageItem` will use the initial value already in storage, or the one provided if there is no existing value.

See the [Storage](https://capacitorjs.com/docs/apis/storage) Capacitor Plugin docs for more info on the plugin API.

## Preferences Hooks

:warning: **Capacitor v4**: requires `"@capacitor/core": ">=4.0.0"` , because `@capacitor/preferences` replaces `@capacitor/storage` , should not be used as the same time as `@capacitor-community/storage-react`

Installation:

```bash
npm install @capacitor-community/preferences-react
```

Usage:

```jsx
import {
  usePreferences,
  usePreferencesItem,
  availableFeatures,
} from '@capacitor-community/preferences-react';
```

`usePreferences` provides access to Capacitor's preferences engine. There is also a helper called `usePreferencesItem` which makes managing a single item easy if you don't need to access the full Preferences API (see below)

```jsx
const { get, set, remove, getKeys, clear } = usePreferences();
useEffect(() => {
  async function example() {
    const value = await get('theme');
    await set('theme', 'Dark');
    await remove('theme');
    const allKeys = await getKeys();
    await clear();
  }
}, [get, set, remove, keys, clear]);
```

### `usePreferencesItem`

`usePreferencesItem` tracks a single item and provides a nice way to read and write that item:

```jsx
const [theme, setTheme] = usePreferencesItem('theme', 'System');

// Example:
const updateTheme = useCallback(
  (n) => {
    setTheme(n);
  },
  [setTheme]
);
```

`usePreferencesItem` will use the initial value already in preferences, or the one provided if there is no existing value.

See the [Preferences](https://capacitorjs.com/docs/apis/preferences) Capacitor Plugin docs for more info on the plugin API.

# Other Hooks

This is an evolving project and not all of the Capacitor Plugins are supported yet. If there is one you need, feel free top open an issue for it, or better yet, submit a PR!
