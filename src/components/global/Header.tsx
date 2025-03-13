import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/Union.svg";
import YYGS from "../../assets/YYGS.png";
import "../../styles/components/global/Header.scss";

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header__con">
      <div className="header__wrapper">
        <img src={YYGS} className="header-logo" alt="YYGS Logo" />
        <div className="cart__con">
          <Link to="/cart" className="icon__con">
            <img src={CartIcon} alt="Cart" className="cart__icon" />
            {itemCount > 0 && <span className="cart__count">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
