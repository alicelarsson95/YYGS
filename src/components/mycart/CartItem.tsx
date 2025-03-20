interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: number, quantity: number) => void;
  onAdd: (id: number) => void;
}

const CartItem = ({ id, name, price, quantity, onRemove, onAdd }: CartItemProps) => {
  return (
    <li className="cart-item">
      <span className="item-name">
        {name} <span className="item-quantity">{quantity} ST</span>
      </span>
      <span className="item-price">{price * quantity} SEK</span> 
      <button onClick={() => onRemove(id, quantity)} className="remove-button">
        -
      </button>
      <button onClick={() => onAdd(id)} className="add-button">
        +
      </button>
    </li>
  );
};

export default CartItem;
