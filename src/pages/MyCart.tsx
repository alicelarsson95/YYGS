import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/slices/cartSlice";

const MyCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // 🛒 Om varukorgen är tom, visa ett meddelande
  if (cartItems.length === 0) {
    return <div className="cart-page">Din varukorg är tom.</div>;
  }

  return (
    <div className="cart-page">
      <h2>Din Beställning</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} - {item.price} SEK</span>
            <span>Antal: {item.quantity}</span>
            <button onClick={() => dispatch(removeFromCart(item.id))}>❌ Ta bort</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(clearCart())}>🗑️ Töm Varukorgen</button>
    </div>
  );
};

export default MyCart;
