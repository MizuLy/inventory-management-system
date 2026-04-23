import React, { useState } from "react";
import { LuX, LuSave } from "react-icons/lu";
import toast from "react-hot-toast";
import { createCustomer, updateCustomer } from "../api/customers";

export default function CustomerModal({
  refreshCustomers,
  edit,
  setEdit,
  formData,
  setFormData,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await updateCustomer(edit, formData);
        toast.success("Customer info edited successfully!");
      } else {
        await createCustomer(formData);
        toast.success("Customer info added successfully!");
      }

      // if success then close
      closeModal();
      if (refreshCustomers) refreshCustomers(); // Call the fetch function from Customers.jsx
      setFormData({ cusName: "", email: "", phone: "", gender: "" });

      setEdit(null);
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
    document.getElementById("customer_modal").close();
  };

  return (
    <>
      <dialog id="customer_modal" className="modal">
        <div className="modal-box bg-white border border-nord-100 max-w-2xl rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-belanosima text-2xl text-nord-900">
              {edit ? "Edit Customer" : "Add New Customer"}
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
                  Customer Name
                </label>
                <input
                  type="text"
                  name="cusName"
                  placeholder="e.g. John Doe"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.cusName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="+855"
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="input bg-nord-50 border-nord-100 focus:border-nord-frost outline-none rounded-xl"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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
                className="btn btn-ghost text-nord-600 font-bold uppercase tracking-widest text-xs focus:outline-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn bg-nord-frost border-none text-white font-bold px-8 rounded-xl hover:brightness-110 shadow-lg shadow-nord-frost/20 focus:outline-none"
              >
                <LuSave size={18} />
                Save Customer
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
