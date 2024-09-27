import AsyncStorage from '@react-native-async-storage/async-storage';
import CoordinatesReducer from './reducers/CoordinatesReducer';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'coordinates',
  storage: AsyncStorage, //Using AsyncStorage to store persisted data
  whitelist: ['coordinates'],
};

const persistedReducer = persistReducer(persistConfig, CoordinatesReducer);

export const store = configureStore({
  reducer: {
    CoordinatesReducer: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          //ignoring the following actions for serializable check if ever used
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['_persist'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
