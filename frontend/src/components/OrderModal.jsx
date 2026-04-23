import React, { useState, useEffect } from "react";
import {
  LuX,
  LuSave,
  LuPlus,
  LuMinus,
  LuTrash2,
  LuShoppingCart,
} from "react-icons/lu";
import { createOrder } from "../api/orders";
import { getProducts } from "../api/products";
import { getCustomers } from "../api/customers";
import toast from "react-hot-toast";

export default function OrderModal({ refreshOrders }) {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
    getCustomers().then((res) => setCustomers(res.data));
  }, []);

  const addItemToOrder = (product) => {
    const exists = selectedItems.find((item) => item.id === product.id);

    if (exists) {
      if (exists.quantity >= product.stock) {
        return toast.error(`Not enough stock for ${product.prodName}`);
      }
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      if (product.stock === 0) {
        return toast.error(`${product.prodName} is out of stock`);
      }
      setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0)
      return toast.error("Please add at least one item");

    setLoading(true);
    try {
      const orderData = {
        customer_id: customerId,
        items: selectedItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData);
      toast.success("Order placed successfully!");
      closeModal();
      if (refreshOrders) refreshOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const reduceItem = (id) => {
    setSelectedItems(
      selectedItems
        .map((item) =>
          item.id === id
            ? item.quantity === 1
              ? null
              : { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(Boolean),
    );
  };

  const closeModal = () => {
    document.getElementById("order_modal").close();
    setSelectedItems([]);
    setCustomerId("");
  };

  return (
    <dialog id="order_modal" className="modal">
      <div className="modal-box bg-white border border-nord-100 max-w-4xl rounded-[2.5rem] p-10 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-nord-frost/10 rounded-2xl text-nord-frost">
              <LuShoppingCart size={24} />
            </div>
            <h3 className="font-belanosima text-3xl text-nord-900 tracking-tight">
              Create New Order
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-nord-50 rounded-full transition-colors text-nord-400"
          >
            <LuX size={28} />
          </button>
        </div>

        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left: Product Selection */}
          <div className="flex-1 flex flex-col min-h-0">
            <label className="label font-black text-[10px] uppercase tracking-widest text-nord-600 mb-2">
              Available Products
            </label>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-nord-50 rounded-2xl border border-transparent hover:border-nord-frost/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-nord-100 overflow-hidden">
                      <img
                        src={
                          p.image?.startsWith("http")
                            ? p.image
                            : `http://localhost:6969/uploads/${p.image}`
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="font-bold text-nord-800 text-sm">
                        {p.prodName}
                      </p>
                      <p className="text-xs font-black text-nord-frost italic">
                        ${Number(p.price).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-nord-400">
                        {p.stock} in stock
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItemToOrder(p)}
                    disabled={p.stock === 0}
                    className="p-2 bg-white text-nord-frost rounded-xl shadow-sm hover:bg-nord-frost hover:text-white transition-all active:scale-90 disabled:opacity-30"
                  >
                    <LuPlus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart & Customer Info */}
          <form
            onSubmit={handleSubmit}
            className="w-80 flex flex-col min-h-0 bg-nord-50/50 rounded-[2rem] p-6 border border-nord-100"
          >
            <div className="mb-6">
              <label className="label font-black text-[10px] uppercase tracking-widest text-nord-600">
                Customer
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
                className="select w-full bg-white border-nord-100 focus:border-nord-frost outline-none rounded-xl text-sm font-bold"
              >
                <option value="" disabled>
                  Select customer
                </option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.cusName}
                  </option>
                ))}
              </select>
            </div>

            <label className="label font-black text-[10px] uppercase tracking-widest text-nord-600 mb-2">
              Order Summary
            </label>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-nord-100/50"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-nord-800 truncate">
                      {item.prodName}
                    </p>
                    <p className="text-[10px] text-nord-400 font-bold">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => reduceItem(item.id)}
                      className="text-nord-400 hover:text-nord-red transition-colors"
                    >
                      <LuMinus size={14} />
                    </button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => addItemToOrder(item)}
                      className="text-nord-400 hover:text-nord-frost transition-colors"
                    >
                      <LuPlus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {selectedItems.length === 0 && (
                <p className="text-center text-[10px] text-nord-300 italic mt-10 uppercase tracking-widest">
                  Cart is empty
                </p>
              )}
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-nord-100">
              <div className="flex justify-between items-end mb-4 px-2">
                <span className="text-[10px] font-black text-nord-400 uppercase tracking-widest">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-nord-frost font-belanosima">
                  ${Number(calculateTotal()).toLocaleString()}
                </span>
              </div>
              <button
                type="submit"
                disabled={loading || selectedItems.length === 0}
                className="btn w-full bg-nord-frost border-none text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-nord-frost/20 py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  <>
                    <LuSave size={18} /> Place Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop bg-nord-900/20 backdrop-blur-sm"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
