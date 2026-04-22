import React, { useState, useRef } from "react";
import { LuX, LuSave, LuImagePlus, LuUpload } from "react-icons/lu";
import { createProduct, updateProduct } from "../api/products";
import toast from "react-hot-toast";

export default function OrderModal({
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
    document.getElementById("order_modal").close();
    setPreview(null);
    setImageFile(null);
  };

  return (
    <>
      <dialog id="order_modal" className="modal">
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
