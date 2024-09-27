import AsyncStorage from '@react-native-async-storage/async-storage';
import CoordinatesReducer from './reducers/CoordinatesReducer';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import PermissionReducer from './reducers/PermissionReducer';

const persistConfig = {
  key: 'coordinates',
  storage: AsyncStorage,
  whitelist: ['coordinates'],
};

const persistedReducer = persistReducer(persistConfig, CoordinatesReducer);

export const store = configureStore({
  reducer: {
    CoordinatesReducer: persistedReducer,
    PermissionReducer: PermissionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
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

// Create a persistor object
export const persistor = persistStore(store);

export default store;
