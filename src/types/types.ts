import {NativeStackScreenProps} from '@react-navigation/native-stack';

export interface Coordinates {
  id: number;
  latitude: number;
  longitude: number;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

export interface MapModalProps {
  isMapOpened: boolean;
  onClose: () => void;
  selectedCoordinate: {
    latitude: number;
    longitude: number;
  } | null;
  address: string;
}
