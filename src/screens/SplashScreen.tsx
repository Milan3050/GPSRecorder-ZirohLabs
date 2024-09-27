import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {SplashScreenProps} from '../types/types';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {requestLocationAuthorization} from '../services/LocationService';

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    requestLocationAuthorization(); //Requesting location permissions

    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/SplashScreenAnimation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lottie: {
    flex: 1,
    width: 300,
    height: 300,
    color: 'rgba(51, 181, 239, 1)',
  },
});
