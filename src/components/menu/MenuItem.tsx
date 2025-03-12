import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: string;
  };
}

const MenuItem = ({ item }: MenuItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="menu-item">
      <div className="menu-item-header">
        <span className="menu-item-name">{item.name}</span>
        <span className="menu-dots"></span>
        <span className="menu-item-price">{item.price} SEK</span>
        <button
          className="menu-add-button"
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
          +
        </button>
      </div>
      <div className="menu-item-description">{item.description}</div>
      <div className="menu-separator"></div>
    </div>
  );
};

export default MenuItem;
