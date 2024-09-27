import React from 'react';
import {SafeAreaView} from 'react-native';

import NavigationProvider from './src/navigation/navigator';

import Geocoder from 'react-native-geocoding';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';

function App(): React.JSX.Element {
  Geocoder.init('AIzaSyDJdCcL_G2KHfLrDkKcjNphNadyt2Oqb6E'); //initializing Geocoder using Google Maps API

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationProvider />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
