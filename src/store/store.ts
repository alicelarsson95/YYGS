import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
import tenantReducer from "./slices/tenantSlice"


export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    cart: cartReducer,
    menu: menuReducer, 
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
