import { useState, useEffect, useContext } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
import PaymentMethod from "../../components/payment/PaymentMethod";
import { toast, ToastContainer } from "react-toastify";
import ApiContext from "../../context/ApiContext";

function Checkout() {
  const navigate = useNavigate();
  const { them } = useContext(ApiContext);

  const productInfo = JSON.parse(localStorage.getItem("cartItems")) || [];
  const addressList = JSON.parse(localStorage.getItem("userAddress")) || [];

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [processing, setProcessing] = useState(false);

  const subtotal = Math.floor(productInfo.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ));

  const delivery = subtotal > 500 ? 0 : 99;
  const total = Math.floor(subtotal + delivery);

  /* Save address */
  useEffect(() => {
    if (savedAddress) {
      const stored = JSON.parse(localStorage.getItem("userAddress")) || [];
      localStorage.setItem(
        "userAddress",
        JSON.stringify([...stored, savedAddress])
      );
    }
  }, [savedAddress]);

  /* FINAL PAYMENT HANDLER */
  function handlePayment(method) {
    if (!selectedAddress) {
      toast.error("Please select delivery address");
      return;
    }

    setProcessing(true);
    toast.loading("Processing payment...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Payment successful 🎉");

      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push({
        id: Date.now(),
        items: productInfo,
        total,
        address: selectedAddress,
        paymentMethod: method,
        date: new Date().toISOString(),
      });

      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("cartItems", JSON.stringify([]));

      setTimeout(() => navigate("/app"), 2000);
    }, 2500);
  }

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <div className={`checkout-wrapper ${them === "dark" ? "dark" : ""}`}>
        {/* ================= LEFT ================= */}
        <div className="checkout-left">
          <Link to="/app/cart">
            <button className="back-btn">← Back to cart</button>
          </Link>

          {/* ADDRESS */}
          <div className="box">
            <h3>Delivery Address</h3>

            {addressList.length ? (
              addressList.map((addr, index) => (
                <label className="address-item" key={index}>
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?.phone === addr.phone}
                    onChange={() => setSelectedAddress(addr)}
                  />
                  <div>
                    <strong>{addr.name}</strong> · {addr.phone}
                    <br />
                    {addr.addressLine}, {addr.city} – {addr.pincode}
                  </div>
                </label>
              ))
            ) : (
              <p>No saved address</p>
            )}

            <button
              className="addAddress"
              onClick={() => setShowAddressModal(true)}
            >
              Add address
            </button>
          </div>

          {/* PAYMENT METHOD COMPONENT */}
          <PaymentMethod total={total} onPay={handlePayment} subtotal={subtotal}/>

          {processing && <p className="processing">Finalizing order…</p>}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="checkout-right">
          <h4>Order Summary</h4>

          {productInfo.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Order Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div className="modal-overlay">
          <div className={`modal-content ${them === "dark" ? "dark" : ""}`}>
            <DeliveryAddress
              onSave={(addr) => {
                setSavedAddress(addr);
                setShowAddressModal(false);
              }}
              onClose={() => setShowAddressModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
