import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Skapa asynkron thunk för att hämta menyn
export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  const apiKey = localStorage.getItem("apiKey") ?? ""; // Fallback till en tom sträng om apiKey inte finns
  const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
    method: "GET",
    headers: {
      "x-zocom": apiKey,
    },
  });

  const data = await response.json();
  return data.items; // Återvänd menyn
});

const initialState = {
  items: [],
  loading: false,
  error: null as string | null, // Ändra här till string | null
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
        state.error = action.error.message || null; // Säkerställ att det är antingen string eller null
      });
  },
});

export default menuSlice.reducer;


