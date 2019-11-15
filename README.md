<p align="center">
  <img src="./ionic-react-hooks.png" alt="Ionic React Hooks" height="225" />
</p>

# Ionic React Hooks

A set of hooks to help Ionic React developers use native [Capacitor APIs](http://capacitor.ionicframework.com/) and various platform APIs available in Ionic Framework.

This is a new project and we'd love your feedback! Is there a hook that we don't have in here you'd like to see? Or maybe a hook that should function differently than it does today? Let us know by filing an issue!

## Support Status

This is a community-supported add-on to Ionic React. If you'd like to help maintain this repo or have an idea for a hook please reach out to [@maxlynch](http://twitter.com/maxlynch) on Twitter.

This also means the core Ionic React team won't necessarily be making regular updates to this repo, but rather encouraging the community to do so.

## Getting Started

To start using Ionic React Hooks in your app, install the hooks library:

```
npm install @ionic/react-hooks
```

## Hook Usage

### `useAccessibility`

`useAccessibility` provides access to detecting and responding to a screen reading device or OS setting being enabled:

```jsx
const isScreenReaderEnabled = useAccessibility();
```

### `useAppState`

`useAppState` provides access to App status information, such as whether the app is active or inactive. This value will update
dynamically.

```jsx
const isActive = useAppState();
```

### `useAppLaunchUrl`

`useAppLaunchUrl` provides the URL the app was initially launched with. If you'd like to track future inbound URL events, use `useAppUrlOpen` below instead.

```jsx
const launchUrl = useAppLaunchUrl();
```

### `useAppUrlOpen`

`useAppUrlOpen` provides the most recent URL used to activate the app. For example, if the user followed a link in another app that opened your app.

```jsx
const urlOpen = useAppUrlOpen();
```

### `useBrowser`

`useBrowser` provides a way to launch, prefetch, and close an in-app browser for external content:

```jsx
const [open, close, prefetch] = useBrowser();
useEffect(() => {
  await prefetch(['http://ionicframework.com']);
  await open('http://ionicframework.com');
  await close();
}, [open, close, prefetch]);
```

### `useCamera`

`useCamera` provides a way to take a photo:

```jsx
const getPhoto = useCamera();
const triggerCamera = useCallback(async () => {
  const photo = await getPhoto(options);
}, [getPhoto]);
```

See the [Camera](https://capacitor.ionicframework.com/docs/apis/camera) Capacitor API for the options expected.

### `useClipboard`

`useClipboard` reads and writes clipboard data:

```jsx
const [data, setValue] = useClipboard();

const paste = useCallback(async () => {
  await setValue('http://ionicframework.com/);
}, [setValue]);
```

### `useDevice`

`useDevice` accesses device information and device language settings:

```jsx
const [info, languageCode] = useDevice();
```

See the [Device](https://capacitor.ionicframework.com/docs/apis/device) Capacitor API for the return type information.

### `useGeolocation`

`useGeolocation` tracks a geolocation position using the `watchPosition` in the Geolocation API in Capacitor.

```jsx
const currentPosition = useGeolocation(options);
```

See the [Geolocation](https://capacitor.ionicframework.com/docs/apis/geolocation) Capacitor API for the options expected.

### `useNetwork`

`useNetwork` monitors network status and information:

```jsx
const status = useNetwork();
```

See the [Network](https://capacitor.ionicframework.com/docs/apis/network) Capacitor API for the type of `status`.

### `useStorage`

`useStorage` provides access to Capacitor's storage engine. There is also a helper called `useStorageItem` which makes managing a single item easy if you don't need to access the full Storage API (see below)

```jsx
const { get, set, remove, keys, clear } = useStorage();
useEffect(() => {
  async function example() {
    const value = await get('name');
    await set('name', 'Max');
    await remove('name');
    const allKeys = await keys();
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
