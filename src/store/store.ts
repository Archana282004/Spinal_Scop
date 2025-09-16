import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: projectReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
