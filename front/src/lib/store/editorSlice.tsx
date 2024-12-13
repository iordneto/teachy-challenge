import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  pagesCount: number;
}

const INITIAL_STATE: EditorState = {
  pagesCount: 1,
};

const editorSlice = createSlice({
  name: "editor",
  initialState: INITIAL_STATE,
  reducers: {
    addPage: (state) => {
      state.pagesCount += 1;
    },
  },
});

export const { addPage } = editorSlice.actions;

export default editorSlice.reducer;
