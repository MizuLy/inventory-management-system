import React, { useState, useRef } from "react";
import { LuX, LuSave, LuImagePlus, LuUpload } from "react-icons/lu";
import { createProduct, updateProduct } from "../api/products";
import toast from "react-hot-toast";

export default function ProductModal({
  refreshProducts,
  edit,
  setEdit,
  formData,
  setFormData,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("prodName", formData.prodName);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (imageFile) data.append("image", imageFile);

      if (edit) {
        await updateProduct(edit, data);
        toast.success("Product edited successfully!");
      } else {
        await createProduct(data);
        toast.success("Product added successfully!");
      }

      closeModal();
      if (refreshProducts) refreshProducts();
      setFormData({
        image: "",
        prodName: "",
        price: "",
        stock: "",
        description: "",
      });
      setImageFile(null);
      setPreview(null);
      setEdit(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    document.getElementById("product_modal").close();
    setPreview(null);
    setImageFile(null);
  };

  return (
    <>
      <dialog id="product_modal" className="modal">
        <div className="modal-box bg-white border border-nord-100 max-w-2xl rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-belanosima text-2xl text-nord-900">
              {edit ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-nord-50 rounded-full transition-colors text-nord-400"
            >
              <LuX size={24} />
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="form-control w-full">
              <label className="label font-bold text-xs uppercase tracking-widest text-nord-600">
                Product Image
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="relative group cursor-pointer w-full h-44 border-2 border-dashed border-nord-100 rounded-2xl flex flex-col items-center justify-center bg-nord-50 overflow-hidden hover:border-nord-frost transition-all"
              >
                {preview || formData.image ? (
                  <>
                    <img
                      src={preview || formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <LuUpload className="text-white" size={30} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-nord-400 group-hover:text-nord-frost transition-colors">
                    <LuImagePlus size={40} strokeWidth={1.5} />
                    <span className="text-xs font-medium mt-2">
                      Click to upload product photo
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

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

            <div className="modal-action gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost text-nord-600 font-bold uppercase tracking-widest text-xs focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn bg-nord-frost border-none text-white font-bold px-8 rounded-xl hover:brightness-110 shadow-lg shadow-nord-frost/20 focus:outline-none"
              >
                {loading ? (
                  <>
                    Saving...
                    <span className="loading loading-infinity loading-md"></span>
                  </>
                ) : (
                  <>
                    <LuSave size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
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
