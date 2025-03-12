import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  const apiKey = localStorage.getItem("apiKey") ?? ""; 
  const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
    method: "GET",
    headers: {
      "x-zocom": apiKey,
    },
  });

  const data = await response.json();
  return data.items; 
});

const initialState = {
  items: [],
  loading: false,
  error: null as string | null, 
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null; 
      });
  },
});

export default menuSlice.reducer;


