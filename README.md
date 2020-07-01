<img src="./ionic-react-hooks-gh.png" height="156" />

# Ionic React Hooks

A set of hooks to help Ionic React developers use native [Capacitor APIs](http://capacitor.ionicframework.com/) and various platform APIs available in Ionic Framework.

This is a new project and we'd love your feedback! Is there a hook that we don't have in here you'd like to see? Or maybe a hook that should function differently than it does today? Let us know by filing an issue!

## Support Status

This is a community-supported add-on to Ionic React. If you'd like to help maintain this repo or have an idea for a hook please file an issue or reach out to the team on Twitter.

This also means the core Ionic React team doesn't guarantee regular updates to this repo, but rather encourages the community to pitch in.

## Getting Started

To start using Ionic React Hooks in your app, install the hooks library:

```
npm install @ionic/react-hooks
```

Import the hooks from their own path:
`import { useStorage } from '@ionic/react-hooks/storage'`

Then use the hooks from that namespace in your app:

```jsx
const [value, setValue] = useStorage('mykey');
```

## Feature Detection

While Capacitor allows you to write to one API across several platforms, not all features are supported on all platforms. It is encouraged to check if the feature you intend to use is available before using it to avoid any runtime errors.

Each of the hook plugin paths exports an `availableFeatures` object, which contains a list features for that plugin. If the feature is supported for the current platform the app is running on, that feature will be true.:

```jsx
const { useStorageItem, availableFeatures } = `@ionic/react-hooks/storage`;
const [value, setValue] = useStorage('mykey');
...
if(availableFeatures.useStorage) {
  setValue('cake');
}
```

# Hook Usage

## Accessibility Hooks

Import:

```jsx
import { useIsScreenReaderEnabled, useSpeak, availableFeatures } from '@ionic/react-hooks/accessibility';
```

`useIsScreenReaderEnabled` provides access to detecting and responding to a screen reading device or OS setting being enabled:

```jsx
const {isScreenReaderEnabled} = useIsScreenReaderEnabled();
```

`useSpeak` activates a text-to-speech engine (if available) to read spoken text.
```jsx
const { speak } = useSpeak();
speak({value: textToSpeak})
```

## AppState Hooks

Import:

```jsx
import { useAppState, useAppUrlOpen, useLaunchUrl, availableFeatures } from '@ionic/react-hooks/app';
```

`useAppState` provides access to App status information, such as whether the app is active or inactive. This value will update dynamically.

```jsx
const {state} = useAppState();
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

## Browser Hooks

Import: 

```jsx
import { useClose, useOpen, usePrefetch, availableFeatures } from '@ionic/react-hooks/browser';
```

`useOpen`, `usePrefetch`, `useClose` provides a way to launch, prefetch, and close an in-app browser for external content:

```jsx
useEffect(() => {
  await usePrefetch(['http://ionicframework.com']);
  await useOpen('http://ionicframework.com');
  await useClose();
}, [useOpen, useClose, usePrefetch]);
```

## Camera Hooks

Import:

```jsx
import { useCamera, availableFeatures } from '@ionic/react-hooks/camera';
```

`useCamera` provides a way to take a photo:

```jsx
const { photo, getPhoto } = useCamera();
const triggerCamera = useCallback(async () => {
  getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    })
}, [getPhoto]);

<div>{photo && <img alt="" src={photo.dataUrl} />}</div>
```

See the [Camera](https://capacitor.ionicframework.com/docs/apis/camera) Capacitor API for the options expected.

## Clipboard Hooks

Import:

```jsx
import { useClipboard, availableFeatures } from '@ionic/react-hooks/clipboard';
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

## Device Hooks

Import: 

```jsx
import { useGetInfo, useGetLanguageCode, availableFeatures } from '@ionic/react-hooks/device';
```

`useGetInfo`, `useGetLanguageCode` gives access to device information and device language settings:

```jsx
const { info } = useGetInfo();
const { languageCode } = useGetLanguageCode();
```

See the [Device](https://capacitor.ionicframework.com/docs/apis/device) Capacitor API for the return type information.

## Filesystem Hooks

import:

```jsx
import { useFilesystem, base64FromPath, availableFeatures } from '@ionic/react-hooks/filesystem';
```

`useFilesystem` returns back common methods to gain access to file system apis.

```jsx
const file = await readFile({
  path: filepath,
  directory: FilesystemDirectory.Data
});
```

See the [Filesystem](https://capacitor.ionicframework.com/docs/apis/filesystem) Capacitor API for description of all the methods and options.

`base64FromPath` is a helper method that will take in a path to a file and return back the base64 encoded representation of that file.

```jsx
const base64String = await base64FromPath(path);
```

## Geolocation Hooks

Import:

```jsx
import { useCurrentPosition, useWatchPosition, availableFeatures } from '@ionic/react-hooks/geolocation';
```

`useCurrentPosition` returns a single geolocation position using the Geolocation API in Capacitor. The position can be manually updated by calling `getPosition`:

```jsx
const { currentPosition, getPosition } = useCurrentPosition();

const handleRefreshPosition = () => {
  getPosition();
}
```

`useWatchPosition` tracks a geolocation position using the `watchPosition` in the Geolocation API in Capacitor. The location will automatically begin updating, and you can use the `clearWatch` and `startWatch` methods to manually stop and restart the watch.

```jsx
const { currentPosition, startWatch, clearWatch } = useWatchPosition();
```

See the [Geolocation](https://capacitor.ionicframework.com/docs/apis/geolocation) Capacitor API for the options expected.

## Keyboard Hooks

Import:

```jsx
import { useKeyboardState } from '@ionic/react-hooks/keyboard';
```

`useKeyboardState` returns whether or not the on-screen keyboard is shown as well as an approximation of the keyboard height in pixels.

```jsx
const { isOpen, keyboardHeight } = useKeyboardState();

// Use keyboardHeight to translate an input that would otherwise be hidden by the keyboard
```


## Network Hooks

Import:

```jsx
import { useStatus, availableFeatures } from '@ionic/react-hooks/network';
```

`useStatus` monitors network status and information:

```jsx
 const { networkStatus } = useStatus();
```

See the [Network](https://capacitor.ionicframework.com/docs/apis/network) Capacitor API for the type of `status`.

## Platform Hooks

Import:

```jsx
import { usePlatform } from '@ionic/react-hooks/platform';
```

`usePlatform` return the current platform supported by Capacitor. Can be `web`, `ios`, `android`, or `electron`.

```jsx
const { platform } = usePlatform();
```

## Storage Hooks

Import:

```jsx
import { useStorage, useStorageItem, availableFeatures } from '@ionic/react-hooks/storage';
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
}, [ get, set, remove, keys, clear ]);
```

#### `useStorageItem`

`useStorageItem` tracks a single item and provides a nice way to read and write that item:

```jsx
const [ name , setName ] = useStorageItem('name', 'Max');

// Example:
const updateName = useCallback((n) => {
  setName(n);
}, [ setName ]);
```

`useStorageItem` will use the initial value already in storage, or the one provided if there is no existing value.

