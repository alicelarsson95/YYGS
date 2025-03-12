import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createOrder as createOrderAPI, getOrderStatus } from "../../services/api";

interface OrderState {
  orderId: string | null;
  eta: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orderId: null,
  eta: null,
  status: "idle",
  error: null,
};


export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (orderItems: any[], { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const tenantId = state.tenant.tenantId;

    if (!tenantId) {
      return rejectWithValue("Tenant-ID saknas.");
    }

    try {
      const data = await createOrderAPI(orderItems, tenantId);
      return data.order; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderStatus = createAsyncThunk(
  "order/fetchOrderStatus",
  async (orderId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const tenantId = state.tenant.tenantId ?? localStorage.getItem("tenantId") ?? "";

    if (!tenantId) {
      return rejectWithValue("Tenant-ID saknas!");
    }

    try {
      const data = await getOrderStatus(orderId, tenantId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<{ orderId: string; eta: number }>) => {
      state.orderId = action.payload.orderId;
      state.eta = action.payload.eta;
      state.status = "succeeded";
    },
    clearOrder: (state) => {
      state.orderId = null;
      state.eta = null;
      state.status = "idle";
      state.error = null;
    },
  }, 

  extraReducers: (builder) => {
    builder
     
      .addCase(createOrderThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<{ id: string; eta: number }>) => {
        state.status = "succeeded";
        state.orderId = action.payload.id;
        state.eta = action.payload.eta;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // 🔹 Hantera hämtning av orderstatus
      .addCase(fetchOrderStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrderStatus.fulfilled, (state, action: PayloadAction<{ id: string; eta: number }>) => {
        state.status = "succeeded";
        state.orderId = action.payload.id;
        state.eta = action.payload.eta;
      })
      .addCase(fetchOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});


export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
