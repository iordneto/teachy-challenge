// lib/store/imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  images: Array<{
    id: number;
    fileName: string;
  }>;
}

const initialState: ImageState = {
  images: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // Ação para adicionar a imagem com metadados
    addImage: (
      state,
      action: PayloadAction<{ id: number; fileName: string }>
    ) => {
      state.images.push(action.payload); // Adiciona o metadado da imagem no estado
    },
  },
});

export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;
