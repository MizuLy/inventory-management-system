import { MdOutlineInventory2 } from "react-icons/md";
import {
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
  LuX,
  LuSave,
  LuLoaderPinwheel,
} from "react-icons/lu";

import { getProducts, createProduct, deleteProduct } from "../api/products";

import AddProductModal from "../components/AddProductModal";
import ConfirmDelete from "../components/ConfirmDelete";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ====Fetch Data====
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // ====DELETE====
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      document.getElementById("delete_modal").close();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((p) =>
    p.prodName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Function to close modal manually if needed
  const closeModal = () => {
    document.getElementById("product_modal").close();
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 font-belanosima text-3xl text-nord-900">
          <MdOutlineInventory2 className="text-nord-frost" />
          <span>Products</span>
        </div>

        <button
          onClick={() => document.getElementById("product_modal").showModal()}
          className="flex items-center gap-2 px-6 py-2 bg-nord-frost text-white font-bold rounded-full hover:opacity-90 transition active:scale-95 shadow-md"
        >
          <LuPlus size={20} />
          <span>Add Product</span>
        </button>
      </div>
      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-nord-600"
            size={18}
          />
          <input
            type="search"
            placeholder="Search for product..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-2 bg-white border border-nord-100 rounded-xl outline-none focus:border-nord-frost transition shadow-sm"
          />
        </div>
      </div>
      {/* Table Container */}
      <div className="w-full border border-nord-100 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-nord-50 font-belanosima text-nord-600 uppercase text-xs tracking-widest border-b border-nord-100">
            <tr>
              <th className="px-6 py-4 w-24">Image</th>
              <th className="px-6 py-4 w-1/3">Product & Description</th>
              <th className="px-6 py-4 w-32">Price</th>
              <th className="px-6 py-4 w-40">Stock</th>
              <th className="px-6 py-4 text-center w-32">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-nord-50">
            {currentItems.length > 0 ? (
              currentItems.map((p, index) => (
                <tr
                  key={p.id}
                  className={`
                    group transition-all duration-200
                    ${(index + 1) % 2 === 0 ? "bg-white" : "bg-nord-frost/10"} 
                    hover:bg-nord-frost/20
                  `}
                >
                  {/* Image Cell */}
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-nord-100 text-nord-600 group-hover:scale-110 transition-transform duration-200">
                      <LuLoaderPinwheel
                        className="hover:animate-spin"
                        size={24}
                      />
                    </div>
                  </td>

                  {/* Name & Description Cell */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-nord-800 truncate">
                      {p.prodName}
                    </div>
                    <p className="text-sm text-nord-500 line-clamp-1 font-normal mt-0.5">
                      {p.description || "No description available"}
                    </p>
                  </td>

                  {/* Price Cell */}
                  <td className="px-6 py-4 text-matcha-deep font-bold italic">
                    ${p.price}
                  </td>

                  {/* Stock Cell */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        p.stock > 10
                          ? "bg-nord-green/20 text-nord-green"
                          : "bg-nord-red/20 text-nord-red"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>

                  {/* Actions Cell (Hidden until hover) */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-2 text-nord-600 hover:text-nord-frost transition-colors">
                        <LuPencil size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(p.id);
                          document.getElementById("delete_modal").showModal();
                        }}
                        className="p-2 text-nord-600 hover:text-nord-red transition-colors"
                      >
                        <LuTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-20 text-center text-nord-400 italic"
                >
                  No products found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div className="px-6 py-4 bg-nord-50/50 border-t border-nord-100 flex items-center justify-between">
          <p className="text-xs text-nord-600 font-bold uppercase tracking-tighter">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
            {filteredProducts.length}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-nord-100 rounded-lg hover:bg-white disabled:opacity-20 transition-all"
            >
              <LuChevronLeft size={18} />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-nord-frost text-white"
                      : "hover:bg-white text-nord-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1.5 border border-nord-100 rounded-lg hover:bg-white disabled:opacity-20 transition-all"
            >
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <AddProductModal refreshProducts={fetchProducts} />

      {/* Confirm delete modal */}
      <ConfirmDelete id={selectedId} onConfirm={handleDelete} />
    </div>
  );
}
