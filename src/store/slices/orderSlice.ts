import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 📝 Orderns initiala state
interface OrderState {
  orderId: string | null;
  eta: number | null;
  status: string;
}

const initialState: OrderState = {
  orderId: null,
  eta: null,
  status: "pending",
};

// 📦 Skapa en Redux slice för orderhantering
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<{ orderId: string; eta: number }>) => {
      state.orderId = action.payload.orderId;
      state.eta = action.payload.eta;
      state.status = "confirmed";
    },
    clearOrder: (state) => {
      state.orderId = null;
      state.eta = null;
      state.status = "pending";
    }
  }
});

// ✅ Lägg till `export default orderSlice.reducer`
export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
