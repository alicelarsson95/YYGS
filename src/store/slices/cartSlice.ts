import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 📦 Varukorgens initiala state
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// 🛒 Skapa en Redux slice för varukorgen
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // 🔄 Öka kvantiteten om varan redan finns i varukorgen
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // ➕ Lägg till ny vara i varukorgen
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = []; // 🗑️ Töm hela varukorgen
    }
  }
});

// ✅ Lägg till `export default cartSlice.reducer`
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;