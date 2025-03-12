import Header from "../components/global/Header";
import MenuList from "../components/menu/MenuList";
import leavesBackground from "../assets/leaves.png";
import "../styles/pages/menu.scss"

const Menu = () => {
  return (
    <div
      className="menu-page"
      style={{ backgroundImage: `url(${leavesBackground})`, backgroundSize: "cover" }}>
      <div className="menu-container">
        <Header />
        <h1 className="menu-title">MENY</h1>
        <MenuList /> 
      </div>
    </div>
  );
};

export default Menu;
