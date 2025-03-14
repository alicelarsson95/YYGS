import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart, clearCart, updateQuantity } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { getTenant } from "../store/slices/tenantSlice";
import { setOrder } from "../store/slices/orderSlice";
import { createOrder } from "../services/api";
import "../styles/pages/myCart.scss";
import CartIcon from "../assets/Union.svg";
import CartList from "../components/mycart/CartList";
import CartSummary from "../components/mycart/CartSum";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

const selectCartItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => [...items]
);

const MyCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const tenantId = useSelector((state: RootState) => state.tenant.tenantId);
  const loading = useSelector((state: RootState) => state.tenant.loading);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getItemIds = () => cartItems.flatMap((item) => Array(item.quantity).fill(item.id));

  const handleCheckout = async () => {
    try {
      const currentTenantId =
        tenantId || localStorage.getItem("tenantId") || (await dispatch(getTenant()).unwrap());
       
      const itemIds = getItemIds();
      

      const orderResponse = await createOrder(itemIds, currentTenantId);
      if (orderResponse?.order?.id) {
        dispatch(setOrder({ orderId: orderResponse.order.id, eta: orderResponse.order.eta ?? 0 }));
        navigate(`/order-status/${orderResponse.order.id}`);
      } else {
        console.error("Order-ID saknas i API-svar:", orderResponse);
      }

      dispatch(clearCart());
    } catch (error) {
      console.error("Fel vid beställning:", error);
    }
  };

  return (
    <div className="cart-page">
      <Link to="/">
        <img src={CartIcon} alt="Cart" className="cart__icon" />
      </Link>
      {cartItems.length > 0 && <h2 className="cart-title">Min Beställning</h2>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Din varukorg är tom</h2>
          <p>Det ser inte ut som att du har lagt något i varukorgen ännu.</p>
          <a href="/" className="shop-link">
            Tillbaka till menyn
          </a>
        </div>
      ) : (
        <div className="cart-container">
          <CartList
            items={cartItems}
            onRemove={(id, quantity) =>
              dispatch(quantity > 1 ? updateQuantity({ id, quantity: quantity - 1 }) : removeFromCart(id))
            }
            onAdd={(id) =>
              dispatch(
                updateQuantity({ id, quantity: cartItems.find((item) => item.id === id)?.quantity! + 1 })
              )
            }
          />
          <CartSummary total={totalPrice} onCheckout={handleCheckout} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default MyCart;
