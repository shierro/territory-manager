export function getLocation() {
  return new Promise((resolve, reject) => {
    function geoSuccess({ coords }) {
      resolve(coords);
    }

    function geoError() {
      reject(new Error('Sorry, no position available.'));
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 27000,
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  });
}
