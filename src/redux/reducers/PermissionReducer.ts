import {createSlice} from '@reduxjs/toolkit';

const PermissionReducer = createSlice({
  name: 'permission',
  initialState: {
    isLocationPermissionGranted: false,
  },
  reducers: {
    setLocationPermission(state, action) {
      state.isLocationPermissionGranted = action.payload;
    },
  },
});

export const {setLocationPermission} = PermissionReducer.actions;

export default PermissionReducer.reducer;
