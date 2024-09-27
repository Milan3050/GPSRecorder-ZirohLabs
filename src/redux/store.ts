import AsyncStorage from '@react-native-async-storage/async-storage';
import CoordinatesReducer from './reducers/CoordinatesReducer';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import PermissionReducer from './reducers/PermissionReducer';

// Persist config
const persistConfig = {
  key: 'coordinates',
  storage: AsyncStorage,
  whitelist: ['coordinates'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, CoordinatesReducer);

export const store = configureStore({
  reducer: {
    CoordinatesReducer: persistedReducer, // Persisted userData reducer
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
          'persist/PURGE', // Ignore purge action
          'persist/FLUSH', // Ignore flush action
          'persist/PAUSE', // Ignore pause action
          'persist/REGISTER',
        ], // Ignore redux-persist actions
        ignoredPaths: ['_persist'], // Ignore the `_persist` key in state
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable devTools in development mode
});

// Create a persistor object
export const persistor = persistStore(store);

export default store;
