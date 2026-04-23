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
        {/* Added w-96 (fixed width) and rounded-2xl for a modern look */}
        <div className="modal-box w-96 max-w-5xl bg-white p-8 border-t-8 border-nord-yellow shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="font-belanosima text-2xl font-black uppercase text-nord-900">
              KS Group
            </h3>
            <p className="text-[12px] text-nord-700 font-bold tracking-widest uppercase">
              Order Receipt #{order?.id.toString().slice(-6)}
            </p>
          </div>

          <div className="w-full h-[1px] bg-nord-100 my-4 border-t border-dashed"></div>

          {/* Customer Info */}
          <div className="mb-6">
            <p className="text-[12px] uppercase text-nord-700 font-black mb-1">
              Customer
            </p>
            <p className="font-bold text-nord-800 text-lg">{order?.cusName}</p>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <p className="text-[12px] uppercase text-nord-700 font-black">
              Items
            </p>
            {order?.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start text-md"
              >
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-nord-700 leading-tight">
                    {item.prodName}
                  </p>
                  <p className="text-xs text-nord-700">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-nord-900">
                  ${(Number(item.price) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-[1px] bg-nord-900 my-6 border-t-2 border-double"></div>

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-black text-nord-900 uppercase tracking-widest">
              Total
            </span>
            <span className="font-black text-2xl text-nord-yellow">
              ${Number(order?.totalPrice).toLocaleString()}
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="text-[10px] text-nord-700 font-medium space-y-1">
            <p className="uppercase">
              Payment Status:{" "}
              <span className="text-nord-600 font-bold">{order?.status}</span>
            </p>
            <p>
              Date: {new Date(order?.created_at).toLocaleDateString()} —{" "}
              {new Date(order?.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Backdrop to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
