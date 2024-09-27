import Geolocation from '@react-native-community/geolocation';
import {Coordinates} from '../types/types';
import Geocoder from 'react-native-geocoding';

//Function to request location permissions
export const requestLocationAuthorization = () => {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization(
      () => {
        console.log('Authorization granted');
        resolve(true);
      },
      (error: {
        code: number;
        message: string;
        PERMISSION_DENIED: number;
        POSITION_UNAVAILABLE: number;
        TIMEOUT: number;
      }) => {
        resolve(false);
      },
    );
  });
};

//Function to fetch Coordinates
export const addLocation = (
  coordinatesList: Coordinates[],
): Promise<Coordinates | undefined> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const newCoords: Coordinates = {
          id: coordinatesList.length + 1,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(newCoords);
      },
      error => {
        reject(error);
      },
      {
        timeout: 15000,
        enableHighAccuracy: true,
      },
    );
  });
};

//Function to fetch address from Coordinates
export const getAddress = (location: Coordinates): Promise<string> => {
  return Geocoder.from(location.latitude, location.longitude)
    .then(json => {
      const addressComponent = json.results[0].formatted_address;
      return addressComponent;
    })
    .catch(error => {
      console.warn(error);
      return '';
    });
};
