import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editorSlice";
import imageReducer from "./imageSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    editor: editorReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
