import {
  Appearance,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  darkMapStyle,
  deviceColorScheme,
  deviceHeight,
  deviceWidth,
  PoppinsRegular,
} from '../constants/styles';
import {MapModalProps} from '../types/types';

const MapModal: React.FC<MapModalProps> = props => {
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => listener.remove();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isMapOpened}
      onRequestClose={props.onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Display modal content here */}
          <MapView
            provider={PROVIDER_GOOGLE} // This makes Google Maps the provider
            customMapStyle={isDarkMode ? darkMapStyle : []}
            region={{
              latitude: props.selectedCoordinate?.latitude ?? 0,
              longitude: props.selectedCoordinate?.longitude ?? 0,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: props.selectedCoordinate?.latitude ?? 0,
                longitude: props.selectedCoordinate?.longitude ?? 0,
              }}
            />
          </MapView>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: (deviceWidth * 90) / 100,
            borderRadius: 10,
            padding: (deviceWidth * 3) / 100,
            marginTop: (deviceHeight * 2) / 100,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: PoppinsRegular,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Address
          </Text>
          <Text style={{color: 'black', fontWeight: '400'}}>
            {props.address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={props.onClose}
          style={{marginTop: (deviceHeight * 2) / 100}}>
          <Text
            style={{
              color: 'white',
              fontFamily: PoppinsRegular,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 15,
    height: (deviceHeight * 60) / 100,
    width: (deviceWidth * 90) / 100,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
