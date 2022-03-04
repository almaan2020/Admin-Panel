import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import userReducer from './slices/userSlice';
import resourceReducer from './slices/resourceSlice';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
  resource: resourceReducer,
}

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['user/create/fulfilled']
    },
  })
});

export default store;