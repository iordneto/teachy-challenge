import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editorSlice";
import imageReducer from "./imageSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
