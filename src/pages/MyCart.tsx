import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart, clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/myCart.scss";
import CartIcon from "../assets/Union.svg";
import { createOrder } from "../services/api";
import { getTenant } from "../store/slices/tenantSlice";
import { setOrder } from "../store/slices/orderSlice";
import CartList from "../components/mycart/CartList";
import CartSummary from "../components/mycart/CartSum";

const MyCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const tenantId = useSelector((state: RootState) => state.tenant.tenantId);
  const loading = useSelector((state: RootState) => state.tenant.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  console.log("Tenant ID:", tenantId);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      let currentTenantId: string | undefined = tenantId ?? localStorage.getItem("tenantId") ?? undefined;

      if (!currentTenantId) {
        console.warn("Tenant-ID saknas! Skapar en ny tenant...");
        currentTenantId = await dispatch(getTenant()).unwrap();
      }

      const orderResponse = await createOrder(cartItems, currentTenantId);
      console.log("Beställning skapad:", orderResponse);

      if (orderResponse && orderResponse.order && orderResponse.order.id) {
        const orderId = orderResponse.order.id;
        const eta = orderResponse.order.eta ?? 0;
        dispatch(setOrder({ orderId, eta }));
        navigate(`/order-status/${orderId}`);
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
      <img src={CartIcon} alt="Cart" className="cart__icon" />
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
          <CartList items={cartItems} onRemove={(id) => dispatch(removeFromCart(id))} />
          <CartSummary total={totalPrice} onCheckout={handleCheckout} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default MyCart;
