import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchCitiesByProvinceId } from './lovCityAPI';

const initialState = {
  value: null,
  status: 'idle',
};

export const getCities = createAsyncThunk(
  'cities/fetchCities',
  async () => {
    const response = await fetchCities();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getCitiesByProvinceId = createAsyncThunk(
  'cities/fetchCitiesByProvinceId',
  async ({ provinceId }) => {
    const response = await fetchCitiesByProvinceId(provinceId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getCitiesByProvinceId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCitiesByProvinceId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cities.value)`
export const selectCities = (state) => state.cities.value;

export default citiesSlice.reducer;