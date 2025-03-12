import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "../styles/pages/order-status.scss";
import foodBox from "../assets/boxtop.png";
import YYGS from "../assets/YYGS.png";

const OrderStatus = () => {
  const { orderId } = useParams();
  const order = useSelector((state: RootState) => state.order);

  const getEtaMinutes = (eta: number | null): number => {
    if (eta === null) return 0;
    return Math.max(0, Math.round((new Date(eta).getTime() - Date.now()) / (1000 * 60)));
  };

  return (
    <div className="order-status-container">
      <img src={YYGS} className="order-logo" alt="YYGS Logo" />
      <div>
        <img src={foodBox} className="food-box" alt="Food box" />
      </div>
      <h1 className="order-title">DINA WONTONS TILLAGAS!</h1>
      <p className="eta">
        ETA {getEtaMinutes(order.eta)} MIN
      </p>
      <p className="order-id">#{orderId}</p>
      <button className="new-order-btn" onClick={() => (window.location.href = "/")}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default OrderStatus;
