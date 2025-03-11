import "../../styles/components/menu/menu-list.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../store/slices/menuSlice";
import { RootState, AppDispatch } from "../../store/store";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  type: string;
  category?: string;
}

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      console.log("API-items:", items);
      items.forEach((item) => {
        console.log("Objekt:", item);
      });
    }
  }, [items]);

  if (loading) return <p>Laddar menyn...</p>;
  if (error) return <p>Ett fel uppstod: {error}</p>;

  const categorizedItems = items.map((item: MenuItem) => {
    const newItem = { ...item };

    if (newItem.type === "dip") {
      newItem.category = "Sauce";
    } else if (newItem.type === "drink") {
      newItem.category = "Drink";
    } else if (newItem.type === "wonton") {
      newItem.category = "Food";
    } else {
      newItem.category = "Other";
    }

    return newItem;
  });

  const foodItems = categorizedItems.filter((item: MenuItem) => item.category === "Food");
  const drinkItems = categorizedItems.filter((item: MenuItem) => item.category === "Drink");
  const sauceItems = categorizedItems.filter((item: MenuItem) => item.category === "Sauce");

  return (
    <div className="menu-list">
      {foodItems.length > 0 && (
        <div>
          <h2>Wontons</h2>
          {foodItems.map((item: MenuItem, index) => (
            <div className="menu-item" key={index}>
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-dots"></span>
                <span className="menu-item-price">{item.price} SEK</span>
              </div>
              <div className="menu-item-description">{item.description}</div>
              <div className="menu-separator"></div>
            </div>
          ))}
        </div>
      )}

      {drinkItems.length > 0 && (
        <div>
          <h2>Drycker</h2>
          {drinkItems.map((item: MenuItem, index) => (
            <div className="menu-item" key={index}>
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-dots"></span>
                <span className="menu-item-price">{item.price} SEK</span>
              </div>
              <div className="menu-item-description">{item.description}</div>
              <div className="menu-separator"></div>
            </div>
          ))}
        </div>
      )}

      {sauceItems.length > 0 && (
        <div>
          <h2>Såser</h2>
          {sauceItems.map((item: MenuItem, index) => (
            <div className="menu-item" key={index}>
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-dots"></span>
                <span className="menu-item-price">{item.price} SEK</span>
              </div>
              <div className="menu-item-description">{item.description}</div>
              <div className="menu-separator"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
