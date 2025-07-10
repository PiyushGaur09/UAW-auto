import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
