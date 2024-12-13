// app/lib/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice"; // Importa o reducer de imagens

// Configuração da Store do Redux
export const store = configureStore({
  reducer: {
    image: imageReducer, // O reducer para lidar com imagens
  },
});

// Tipos para os hooks do Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
