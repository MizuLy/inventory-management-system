import React, { useEffect, useState } from "react";
import { getOrderById } from "../api/orders";

export default function ReceiptModal({ id }) {
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  return (
    <>
      <dialog id="receipt_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Receipt #{order?.id}</h3>
          <p className="pb-4">Customer: {order?.cusName}</p>
          {order?.items?.map((item) => (
            <div key={item.id}>
              {item.prodName} x{item.quantity} — $
              {Number(item.price).toLocaleString()}
            </div>
          ))}
          <p className="font-bold mt-4">
            Total: ${Number(order?.totalPrice).toLocaleString()}
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
