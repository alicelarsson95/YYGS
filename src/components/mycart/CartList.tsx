import CartItem from "./CartItem";
interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface CartListProps {
  items: CartItemType[];
  onRemove: (id: number, quantity: number) => void;
  onAdd: (id: number) => void;
}

const CartList = ({ items, onRemove, onAdd }: CartListProps) => {
  return (
    <ul className="cart-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={onRemove}
          onAdd={onAdd}
        />
      ))}
    </ul>
  );
};

export default CartList;
