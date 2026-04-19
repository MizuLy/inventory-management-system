import React, { useState } from "react";
import { LuX, LuSave } from "react-icons/lu";
import { createProduct } from "../api/products";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductModal({ refreshProducts }) {
  const [formData, setFormData] = useState({
    image: "",
    prodName: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProduct(formData);

      // if success then close
      closeModal();
      if (refreshProducts) refreshProducts(); // Call the fetch function from Products.jsx
      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to close modal manually if needed
  const closeModal = () => {
    document.getElementById("product_modal").close();
  };

  return (
    <>
      <Toaster position="top-right" />
      <dialog id="product_modal" className="modal">
        <div className="modal-box bg-white border border-nord-100 max-w-2xl rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-belanosima text-2xl text-nord-900">
              Add New Product
            </h3>
            {/* Use a simple button instead of a nested form */}
            <button
              onClick={closeModal}
              className="p-2 hover:bg-nord-50 rounded-full transition-colors text-nord-400"
            >
              <LuX size={24} />
            </button>
          </div>

          {/* Main Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full col-span-2">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Product Name
                </label>
                <input
                  type="text"
                  name="prodName"
                  placeholder="e.g. Endoscope"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.prodName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  placeholder="0.00"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="0"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full col-span-2">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl h-24"
                  placeholder="Brief details about the product..."
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-action gap-3">
              {/* By adding type="button", this won't submit the form.
              By calling closeModal, we use the dialog API to shut it.
            */}
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost text-nord-600 font-bold uppercase tracking-widest text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn bg-nord-frost border-none text-white font-bold px-8 rounded-xl hover:brightness-110 shadow-lg shadow-nord-frost/20"
              >
                <LuSave size={18} />
                Save Product
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close (This is outside the main form, so it's okay) */}
        <form
          method="dialog"
          className="modal-backdrop bg-dark/20 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
