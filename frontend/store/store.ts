import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authReducer";

export const store = configureStore({
  reducer: {
   auth : authSlice,
  },
});

// Types for usage with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
