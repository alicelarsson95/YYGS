import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Menu from "./pages/Menu";
import MyCart from "./pages/MyCart";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Menu />} />
            <Route path="cart" element={<MyCart />} />
            
        </Route>
    )
);