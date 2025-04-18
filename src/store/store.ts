import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./userSlice";
import boardsReducer from "./boardsSlice";
import activeBoardReducer from "./activeBoardSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    activeBoard: activeBoardReducer,
    modal: modalReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
