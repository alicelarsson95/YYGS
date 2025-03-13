import CartItem from "./CartItem";

interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartListProps {
  items: CartItemType[];
  onRemove: (id: number) => void;
}

const CartList = ({ items, onRemove }: CartListProps) => {
  return (
    <ul className="cart-list">
      {items.map((item) => (
        <CartItem key={item.id}
         id={item.id} name={item.name}
          price={item.price} onRemove={onRemove} />
      ))}
    </ul>
  );
};

export default CartList;
