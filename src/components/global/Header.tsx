import "../../styles/components/global/Header.scss";
import { Link } from "react-router-dom"; 
import YYGS from "../../assets/YYGS.png";
import CartHeader from "../cart/CartHeader"

const Header = () => {
  return (
    <header className="header__con">
      <div className="header__wrapper">
        <img src={YYGS} className="header-logo" alt="YYGS Logo" />
        <CartHeader />
      </div>
    </header>
  );
};

export default Header;
