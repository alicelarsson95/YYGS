import "../../styles/components/global/Header.scss"; 
import YYGS from "../../assets/YYGS.png";
import CartHeader from "./CartHeader"

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
