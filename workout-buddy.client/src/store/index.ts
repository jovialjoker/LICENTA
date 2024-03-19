import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./reducers/account";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
