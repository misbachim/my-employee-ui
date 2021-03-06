import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProvinces } from './lovProvinceAPI';

const initialState = {
  value: null,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchProvinces(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getProvinces = createAsyncThunk(
  'provinces/fetchProvinces',
  async () => {
    const response = await fetchProvinces();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const provincesSlice = createSlice({
  name: 'provinces',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getProvinces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.provinces.value)`
export const selectProvinces = (state) => state.provinces.value;

export default provincesSlice.reducer;
