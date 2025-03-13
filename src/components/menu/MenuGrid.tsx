import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import "../../styles/components/menu/menu-grid.scss";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface MenuGridProps {
  title: string;
  price?: string;
  items: MenuItem[];
}

const MenuGrid = ({ title, price, items }: MenuGridProps) => {
  const dispatch = useDispatch();
  if (!items.length) return null;

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({ ...item, price: Number(item.price), quantity: 1 }));
  };

  return (
    <div className="menu-grid-container">
      <h2>{title}</h2>
      {price && <p>{price}</p>}
      <div className="grid">
        {items.map((item) => (
          <button key={item.id} className="grid-button" onClick={() => handleAddToCart(item)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
