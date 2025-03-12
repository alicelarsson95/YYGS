import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import "../../styles/components/menu/menu-grid.scss"; // Lägg till en egen fil för grid-styling

interface MenuGridProps {
  title: string;
  price?: string;
  items: {
    id: number;
    name: string;
    description: string;
    price: string;
  }[];
}

const MenuGrid = ({ title, price, items }: MenuGridProps) => {
  const dispatch = useDispatch();

  if (items.length === 0) return null;

  return (
    <div className="menu-grid-container">
      <h2>{title}</h2>
      {price && <p>{price}</p>}
      <div className="grid">
        {items.map((item) => (
          <button
            key={item.id}
            className="grid-button"
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  price: Number(item.price),
                  quantity: 1,
                })
              )
            }>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
