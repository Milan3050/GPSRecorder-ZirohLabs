import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'; // Ensure the path is correct
import SplashScreen from '../screens/SplashScreen';
import {RootStackParamList} from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const NavigationProvider: React.FC = () => {
  return <AuthStack />;
};

export default NavigationProvider;
