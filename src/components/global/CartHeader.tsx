import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartIcon from "../../assets/Union.svg";
import { Link } from "react-router-dom";
import "../../styles/components/global/cartHeader.scss";

const CartHeader = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart__con">
      <Link to="/cart" className="icon__con">
        <img src={CartIcon} alt="Cart" className="cart__icon" />
        {itemCount > 0 && <span className="cart__count">{itemCount}</span>}
      </Link>
    </div>
  );
};

export default CartHeader;
