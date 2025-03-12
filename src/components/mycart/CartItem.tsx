
interface CartItemProps {
    id: number;
    name: string;
    price: number;
    onRemove: (id: number) => void;
  }
  
  const CartItem = ({ id, name, price, onRemove }: CartItemProps) => {
    return (
      <li className="cart-item">
        <span className="item-name">{name}</span>
        <span className="item-price">{price} SEK</span>
        <button onClick={() => onRemove(id)} className="remove-button">
          ❌
        </button>
      </li>
    );
  };
  
  export default CartItem;
  
