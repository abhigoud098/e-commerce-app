import { useContext, useState } from "react";
import "./PaymentMethod.css";
import { toast, ToastContainer } from "react-toastify";
import ApiContext from "../../context/ApiContext";

function PaymentMethod({ total, onPay, subtotal }) {
  console.log(subtotal);

  const [method, setMethod] = useState(null);
  const { theam } = useContext(ApiContext);

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [upi, setUpi] = useState("");

  function handlePay() {
    if (!method) {
      toast.error("Please Select a payment method");
      return;
    }

    if (subtotal === 0) {
      toast.error("Please add to cart items");
      return;
    }

    if (method === "card") {
      if (
        card.name.length < 3 ||
        card.number.length !== 16 ||
        card.cvv.length !== 3 ||
        !card.expiry.includes("/")
      ) {
        toast.error("Enter valid card details");
        return;
      }
    }

    if (method === "upi" && !upi.includes("@")) {
      toast.error("Enter valid UPI ID");
      return;
    }

    onPay(method);
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div className={`payment-wrapper ${theam ? "dark" : ""}`}>
        <h3 className="payment-title">Payment Method</h3>

        {/* CARD PAYMENT */}
        <div
          className={`pay-box ${method === "card" ? "active" : ""} ${
            theam ? "dark" : ""
          }`}
        >
          <label className="pay-header">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("card")}
            />
            <span>Credit or Debit Card</span>
          </label>

          <div className="card-icons">
            <img src="/src/assets/visa.png" alt="visa" />
            <img src="/src/assets/mastercard.svg" alt="mastercard" />
            <img src="/src/assets/rupay.png" alt="rupay" />
            <img src="/src/assets/amex.svg" alt="amex" />
          </div>

          {method === "card" && (
            <div className="card-form">
              <input
                placeholder="Name on card"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />

              <input
                placeholder="Card number"
                maxLength="16"
                value={card.number}
                onChange={(e) =>
                  setCard({
                    ...card,
                    number: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <div className="row">
                <input
                  placeholder="MM / YY"
                  maxLength="5"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                />
                <input
                  placeholder="CVV"
                  maxLength="3"
                  value={card.cvv}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      cvv: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* UPI */}
        <div
          className={`pay-box ${method === "upi" ? "active" : ""} ${
            theam ? "dark" : ""
          }`}
        >
          <label className="pay-header">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("upi")}
            />
            <span>UPI</span>
          </label>

          <div className="upi-icons">
            <img src="/src/assets/phonepe.svg" alt="phonepe" />
            <img src="/src/assets/googlepay.svg" alt="gpay" />
            <img src="/src/assets/paytm.svg" alt="paytm" />
          </div>

          {method === "upi" && (
            <input
              className="upi-input"
              placeholder="example@upi"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          )}
        </div>

        {/* CASH ON DELIVERY */}
        <div
          className={`pay-box ${method === "cod" ? "active" : ""} ${
            theam ? "dark" : ""
          }`}
        >
          <label className="pay-header">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>

          {method === "cod" && (
            <p className="cod-note">
              Pay in cash when your order is delivered.
            </p>
          )}
        </div>
        <button className="pay-btn" onClick={handlePay}>
          {method
            ? `Pay $${total} using ${method.toUpperCase()}`
            : `Pay $${total}`}
        </button>
      </div>
    </>
  );
}

export default PaymentMethod;
