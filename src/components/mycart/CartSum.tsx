interface CartSummary {
  total: number;
  onCheckout: () => void;
  loading: boolean;
}

const CartSummary = ({ total, onCheckout, loading }: CartSummary) => {
  return (
    <div className="cart-summary">
      <div className="cart-total">
        <span className="total-label">TOTALT</span>
        <span className="total-price">{total} SEK</span>
      </div>
      <button className="checkout-button" onClick={onCheckout} disabled={loading}>
        {loading ? "Skapar Tenant..." : "TAKE MY MONEY!"}
      </button>
    </div>
  );
};

export default CartSummary;
