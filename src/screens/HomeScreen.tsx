import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCoordinates,
  deleteCoordinates,
} from '../redux/reducers/CoordinatesReducer';

import {Coordinates, HomeScreenProps} from '../types/types';

import {
  addLocation,
  getAddress,
  requestLocationAuthorization,
} from '../services/LocationService';
import {deviceHeight, deviceWidth, PoppinsRegular} from '../constants/styles';
import MapModal from '../components/MapModal';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [selectedCoordinate, setSelectedCoordinate] =
    useState<Coordinates | null>(null);

  const coordinatesList = useSelector(
    (state: any) => state.CoordinatesReducer.coordinates,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState<string>('');

  const dispatch = useDispatch();

  const findLocation = async () => {
    try {
      const newCoordinates: Coordinates | undefined = await addLocation(
        coordinatesList,
      );
      if (newCoordinates) {
        dispatch(addCoordinates(newCoordinates));
      }
    } catch (error: any) {
      if (
        error.message === 'Location permission was not granted.' ||
        error.message === 'User denied access to location services.'
      )
        Alert.alert(
          'Location Access Denied',
          'Location permissions is required to use this app. Please allow location access through settings.',
        );
    }
  };

  const deleteLocation = (id: number) => {
    dispatch(deleteCoordinates(id));
  };

  const renderList = ({item}: {item: Coordinates}): React.JSX.Element => {
    const handlePress = async () => {
      try {
        const fetchedAddress = await getAddress(item);
        setAddress(fetchedAddress);
        setSelectedCoordinate(item);
        setModalVisible(true);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/images/OneDriveCloud.png')}
            style={styles.oneDriveCloud}
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.coordinateText}>
              {item.latitude}, {item.longitude}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => deleteLocation(item.id)}>
          <Image
            source={require('../../assets/images/Delete.png')}
            style={styles.deleteImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View>
      <Image
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      />
      <View style={styles.WelcomeTextContainer}>
        <Text style={styles.WelcomeText}>Welcome to GPS Store</Text>
        <Text style={styles.emptyStoreText}>Your GPS store is empty</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.header} />
        <Text style={styles.headerText}>Coordinates</Text>
      </View>
      <View>
        <FlatList
          data={coordinatesList}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{paddingBottom: (deviceHeight * 15) / 100}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.circle} onPress={findLocation}>
        <Image
          source={require('../../assets/images/PlusIcon.png')}
          style={styles.addButton}
        />
      </TouchableOpacity>
      <MapModal
        isMapOpened={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCoordinate={selectedCoordinate}
        address={address}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'rgba(51, 181, 239, 1)',
    height: (deviceHeight * 7) / 100,
  },
  headerText: {
    color: 'rgba(139, 139, 139, 1)',
    paddingVertical: (deviceHeight * 1.5) / 100,
    backgroundColor: 'rgba(240, 240, 240, 1)',
    paddingLeft: (deviceWidth * 3) / 100,
    fontSize: 16,
    fontFamily: PoppinsRegular,
  },
  cloud: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (deviceHeight * 20) / 100,
  },
  WelcomeTextContainer: {
    alignItems: 'center',
  },
  WelcomeText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: PoppinsRegular,
  },
  emptyStoreText: {
    color: 'rgba(139, 139, 139, 1)',
    paddingTop: (deviceHeight * 1) / 100,
    fontSize: 16,
    fontFamily: PoppinsRegular,
  },
  circle: {
    position: 'absolute',
    right: 35,
    bottom: 100,
    borderRadius: 50,
  },
  addButton: {
    width: 80,
    height: 80,
  },
  itemContainer: {
    paddingVertical: (deviceHeight * 3) / 100,
    paddingHorizontal: (deviceWidth * 3) / 100,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coordinateText: {
    color: 'black',
    fontSize: 16,
    fontFamily: PoppinsRegular,
    paddingLeft: (deviceWidth * 3) / 100,
  },
  oneDriveCloud: {
    width: 30,
    height: 25,
  },
  deleteImage: {
    width: 23,
    height: 23,
  },
});
