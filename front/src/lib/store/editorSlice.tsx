import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Instale o pacote uuid se ainda não o fez

interface Page {
  id: string;
}

interface EditorState {
  pages: Page[];
}

const INITIAL_STATE: EditorState = {
  pages: [{ id: uuidv4() }], // Página inicial com UUID gerado
};

const editorSlice = createSlice({
  name: "editor",
  initialState: INITIAL_STATE,
  reducers: {
    addPage: (state) => {
      state.pages.push({ id: uuidv4() }); // Adiciona uma nova página com UUID único
    },
    removePage: (state, action: PayloadAction<string>) => {
      state.pages = state.pages.filter((page) => page.id !== action.payload); // Remove a página com o UUID fornecido
    },
  },
});

export const { addPage, removePage } = editorSlice.actions;

export default editorSlice.reducer;
