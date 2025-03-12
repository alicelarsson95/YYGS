import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart, clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/pages/myCart.scss";
import CartIcon from "../assets/Union.svg";
import { createOrder } from "../services/api";
import { getTenant } from "../store/slices/tenantSlice";

const MyCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const tenantId = useSelector((state: RootState) => state.tenant.tenantId);
  const loading = useSelector((state: RootState) => state.tenant.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      if (!tenantId) {
        console.warn("Tenant-ID saknas! Skapar en ny tenant...");
        await dispatch(getTenant());
      }

       const order = await createOrder(cartItems); 
      console.log("Beställning skapad:", order);
      dispatch(clearCart());
      navigate(`/orderstat-us/${order.id}`);
    } catch (error) {
      console.error("Fel vid beställning:", error);
    }
  };

  return (
    <div className="cart-page">
      <img src={CartIcon} alt="Cart" className="cart__icon" />
      <h2 className="cart-title">Min Beställning</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Din varukorg är tom.</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-dots"></span>
                <span className="item-price">{item.price} SEK</span>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-button">
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span className="total-label">TOTALT</span>
            <span className="total-price">{totalPrice} SEK</span>
          </div>

          <button className="checkout-button" onClick={handleCheckout} disabled={loading}>
            {loading ? "Skapar Tenant..." : "TAKE MY MONEY!"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
