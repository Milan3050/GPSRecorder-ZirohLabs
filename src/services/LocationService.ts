import Geolocation from '@react-native-community/geolocation';
import {Coordinates} from '../types/types';
import Geocoder from 'react-native-geocoding';

export const requestLocationAuthorization = () => {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization(
      // Success callback
      () => {
        console.log('Authorization granted');
        resolve(true); // Resolve to true on success
      },
      // Error callback
      (error: {
        code: number;
        message: string;
        PERMISSION_DENIED: number;
        POSITION_UNAVAILABLE: number;
        TIMEOUT: number;
      }) => {
        resolve(false); // Resolve to false on failure
      },
    );
  });
};

export const addLocation = (
  coordinatesList: Coordinates[],
): Promise<Coordinates | undefined> => {
  return new Promise((resolve, reject) => {
    // Access the Redux state inside the async function

    Geolocation.getCurrentPosition(
      position => {
        const newCoords: Coordinates = {
          id: coordinatesList.length + 1,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(newCoords); // Resolve with new coordinates
      },
      error => {
        reject(error); // Reject the promise if there's an error
      },
      {
        timeout: 15000, // Optional: adjust as needed
        enableHighAccuracy: true, // Optional: use high accuracy if available
      },
    );
  });
};

export const getAddress = (location: Coordinates): Promise<string> => {
  return Geocoder.from(location.latitude, location.longitude)
    .then(json => {
      const addressComponent = json.results[0].address_components[0];
      return addressComponent.long_name; // Returning the long name of the address
    })
    .catch(error => {
      console.warn(error);
      return ''; // Return an empty string or handle the error as needed
    });
};
