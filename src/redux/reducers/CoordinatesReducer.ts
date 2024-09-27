import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coordinates} from '../../types/types';

const CoordinatesReducer = createSlice({
  name: 'coordinates',
  initialState: {
    coordinates: [] as Coordinates[],
  },
  reducers: {
    addCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.coordinates.push(action.payload);
    },
    deleteCoordinates: (state, action: PayloadAction<number>) => {
      state.coordinates = state.coordinates.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const {addCoordinates, deleteCoordinates} = CoordinatesReducer.actions;

export default CoordinatesReducer.reducer;
