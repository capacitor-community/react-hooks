<img src="./ionic-react-hooks-gh.png" height="156" />

# Ionic React Hooks

A set of hooks to help Ionic React developers use native [Capacitor APIs](http://capacitor.ionicframework.com/) and various platform APIs available in Ionic Framework.

This is a new project and we'd love your feedback! Is there a hook that we don't have in here you'd like to see? Or maybe a hook that should function differently than it does today? Let us know by filing an issue!

## Support Status

This is a community-supported add-on to Ionic React. If you'd like to help maintain this repo or have an idea for a hook please reach out to [@maxlynch](http://twitter.com/maxlynch) on Twitter.

This also means the core Ionic React team doesn't guarantee regular updates to this repo, but rather encourages the community to pitch in.

## Getting Started

To start using Ionic React Hooks in your app, install the hooks library:

```
npm install @ionic/react-hooks
```

Import the hook "namespace" which provides hooks from the main Capacitor plugins.
EX:
`import { StorageHooks } from '@ionic/react-hooks'`

Then use the hooks from that namespace in your app:

```jsx
const { useStorageItem } = StorageHooks;
const [value, setValue] = useStorage('mykey');
```

## Feature Detection

While Capacitor allows you to write to one API across several platforms, not all features are supported on all platforms. It is encouraged to check if the feature you intend to use is available before using it to avoid any runtime errors.

Each of the hook plugin namespaces exports an `availableFeatures` object, which contains a list features for that plugin. If the feature is supported for the current platform the app is running on, that feature will be true.:

```jsx
const { useStorageItem, availableFeatures } = StorageHooks;
const [value, setValue] = useStorage('mykey');
...
if(availableFeatures.useStorage) {
  setValue('cake');
}
```

## Hook Usage

### `AccessibilityHooks`

Import:

```jsx
import { AccessibilityHooks } from '@ionic/react-hooks';
const { useIsScreenReaderEnabled, useSpeak, availableFeatures } = AccessibilityHooks;
```

`useIsScreenReaderEnabled` provides access to detecting and responding to a screen reading device or OS setting being enabled:

```jsx
const {isScreenReaderEnabled} = useIsScreenReaderEnabled();
```

`useSpeak` activates a text-to-speech engine (if available) to read spoken text.
```jsx
const {speak} = useSpeak();
speak({value: textToSpeak})
```

### `AppStateHooks`

Import:

```jsx
import { AppHooks } from '@ionic/react-hooks';
const { useAppState, useAppUrlOpen, useLaunchUrl, availableFeatures } = AppHooks;
```

`useAppState` provides access to App status information, such as whether the app is active or inactive. This value will update dynamically.

```jsx
const {state} = useAppState();
```

### `useLaunchUrl`

`useLaunchUrl` provides the URL the app was initially launched with. If you'd like to track future inbound URL events, use `useAppUrlOpen` below instead.

```jsx
const {launchUrl} = useLaunchUrl();
```

### `useAppUrlOpen`

`useAppUrlOpen` provides the most recent URL used to activate the app. For example, if the user followed a link in another app that opened your app.

```jsx
const {appUrlOpen} = useAppUrlOpen();
```

### `BrowserHooks`

Import: 

```jsx
import { BrowserHooks } from '@ionic/react-hooks';
const { useClose, useOpen, usePrefetch, availableFeatures } = BrowserHooks;
```

`useOpen`, `usePrefetch`, `useClose` provides a way to launch, prefetch, and close an in-app browser for external content:

```jsx
useEffect(() => {
  await prefetch(['http://ionicframework.com']);
  await open('http://ionicframework.com');
  await close();
}, [open, close, prefetch]);
```

### `CameraHooks`

Import:

```jsx
import { CameraHooks } from '@ionic/react-hooks';
const { useCamera, availableFeatures } = CameraHooks;
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

```
<div>{photo && <img alt="" src={photo.dataUrl} />}</div>
```

See the [Camera](https://capacitor.ionicframework.com/docs/apis/camera) Capacitor API for the options expected.

### `ClipboardHooks`

Import:

```jsx
import { ClipboardHooks } from '@ionic/react-hooks';
const { useClipboard, availableFeatures } = ClipboardHooks;
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

### `DeviceHooks`

Import: 

```jsx
import { DeviceHooks } from '@ionic/react-hooks';
const { useGetInfo, useGetLanguageCode, availableFeatures } = DeviceHooks;
```

`useGetInfo`, `useGetLanguageCode` gives access to device information and device language settings:

```jsx
const { info } = useGetInfo();
const { languageCode } = useGetLanguageCode();
```

See the [Device](https://capacitor.ionicframework.com/docs/apis/device) Capacitor API for the return type information.

### `GeolocationHooks`

Import:

```jsx
import { GeolocationHooks } from '@ionic/react-hooks';
const { useCurrentPosition, useWatchPosition, availableFeatures } = GeolocationHooks;
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
const { currentPosition, startWatch, clearWatch} = useWatchPosition();
```

See the [Geolocation](https://capacitor.ionicframework.com/docs/apis/geolocation) Capacitor API for the options expected.

### `NetworkHooks`

Import:

```jsx
import { NetworkHooks } from '@ionic/react-hooks';
const { useStatus, availableFeatures } = NetworkHooks;
```

`useStatus` monitors network status and information:

```jsx
 const { networkStatus } = useStatus();
```

See the [Network](https://capacitor.ionicframework.com/docs/apis/network) Capacitor API for the type of `status`.

### `PlatformHooks`

Import:

```jsx
import { PlatformHooks } from '@ionic/react-hooks';
const { usePlatform } = PlatformHooks;
```

`usePlatform` return the current platform supported by Capacitor. Can be `web`, `ios`, `android`, or `electron`.

```jsx
const { platform } = usePlatform();
```

### `StorageHooks`

Import:

```jsx
import { StorageHooks } from '@ionic/react-hooks';
const { useStorage, useStorageItem, availableFeatures } = StorageHooks;
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

### `useStorageItem`

`useStorageItem` tracks a single item and provides a nice way to read and write that item:

```jsx
const [ name , setName ] = useStorageItem('name', 'Max');

// Example:
const updateName = useCallback((n) => {
  setName(n);
}, [ setName ]);
```

`useStorageItem` will use the initial value already in storage, or the one provided if there is no existing value.

