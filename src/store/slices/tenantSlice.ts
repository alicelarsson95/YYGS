import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TenantState {
  tenantId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TenantState = {
  tenantId: localStorage.getItem("tenantId") || null,
  loading: false,
  error: null as string | null,
};

export const getTenant = createAsyncThunk("tenant/createtenant", async (_, { getState, rejectWithValue }) => {
  const state = getState() as { tenant: TenantState };
  let tenantId = state.tenant.tenantId ?? localStorage.getItem("tenantId");

  if (tenantId) {
    return tenantId; 
  }

  try {
    const apiKey = localStorage.getItem("apiKey") ?? "";

    if (!apiKey) {
      return rejectWithValue("API-nyckel saknas.");
    }

    const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants", {
      method: "POST",
      headers: {
        "x-zocom": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "alicewontons" }),
    });

    if (!response.ok) {
      throw new Error(`API-fel: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("tenantId", data.id);
    return data.id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    clearTenantId: (state) => {
      state.tenantId = null;
      localStorage.removeItem("tenantId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTenant.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tenantId = action.payload;
      })
      .addCase(getTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTenantId } = tenantSlice.actions;
export default tenantSlice.reducer;
