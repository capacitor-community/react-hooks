import { useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
export function useGeolocation(options) {
    var Geolocation = Plugins.Geolocation;
    var _a = useState(null), currentPosition = _a[0], setCurrentPosition = _a[1];
    useEffect(function () {
        var watchId = Geolocation.watchPosition(options || {}, function (pos) {
            setCurrentPosition(pos);
        });
        return function () { Geolocation.clearWatch({ id: watchId }); };
    }, [Geolocation, setCurrentPosition, options]);
    return currentPosition;
}
//# sourceMappingURL=useGeolocation.js.map