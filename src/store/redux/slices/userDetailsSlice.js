import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: [],
  isLoading: false,
  error: null, 
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      console.log(action.payload , 'from redux slice');
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
    // Optional reducers for loading and error states
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading, setError } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
