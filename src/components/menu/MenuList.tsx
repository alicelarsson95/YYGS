import "../../styles/components/menu/menu-list.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../store/slices/menuSlice";
import { RootState, AppDispatch } from "../../store/store";
import MenuItem from "./MenuItem";
import MenuGrid from "./MenuGrid";

type MenuItemType = {
  id: number;
  type: string;
  name: string;
  price: string;
  description: string;
};

const MenuList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.menu as { items: MenuItemType[]; loading: boolean; error: string | null }
  );

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  if (loading) return <p>Laddar menyn...</p>;
  if (error) return <p>Ett fel uppstod: {error}</p>;

  const wontons = items.filter((item) => item.type === "wonton");
  const dips = items.filter((item) => item.type === "dip");
  const drinks = items.filter((item) => item.type === "drink");

  return (
    <div className="menu-list">
      {wontons.length > 0 && (
        <div>
          <h2>Wontons</h2>
          {wontons.map((item: MenuItemType) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <MenuGrid title="Dipsås" price="19 SEK" items={dips} />
      <MenuGrid title="Drinks" price="19 SEK" items={drinks} />
    </div>
  );
};

export default MenuList;
