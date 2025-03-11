import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartIcon from "../../assets/Union.svg";


const CartHeader = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  
  const itemCount = cartItems
    ? cartItems.reduce((acc: number, item) => acc + item.quantity, 0)
    : 0;

  return (
    <div className="cart__con">
      <div className="icon__con">
        <img src={CartIcon} alt="Cart" className="cart__icon" />
      </div>
      {itemCount > 0 && <span className="cart__count">{itemCount}</span>}
    </div>
  );
};

export default CartHeader;
