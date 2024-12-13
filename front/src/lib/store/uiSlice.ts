import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  activeTab: "text" | "uploads";
}

const initialState: UiState = {
  activeTab: "uploads",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
