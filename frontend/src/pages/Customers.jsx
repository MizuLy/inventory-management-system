import { TbUsersGroup } from "react-icons/tb";
import {
  LuSearch,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import CustomerModal from "../components/CustomerModal";
import { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../api/customers";
import ConfirmDelete from "../components/ConfirmDelete";
import { Toaster } from "react-hot-toast";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState({
    cusName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [selectedId, setSelectedId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch Data
  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===Edit===
  const handleUpdate = async (c) => {
    try {
      setFormData({
        cusName: c.cusName,
        email: c.email,
        phone: c.phone,
        gender: c.gender,
      });

      setEdit(c.id);
    } catch (err) {
      console.error(err);
    }
  };

  // ====Delete====
  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      document.getElementById("delete_modal").close();
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Search Logic
  const filteredCustomers = customers.filter((c) => {
    return Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      {/* Header Section - Matches Products Size */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 font-belanosima text-3xl text-nord-900">
          <div className="p-2 rounded-lg">
            <TbUsersGroup className="text-nord-frost" />
          </div>
          <span>Customers</span>
        </div>

        <button
          onClick={() => document.getElementById("customer_modal").showModal()}
          className="flex items-center gap-2 px-6 py-2 bg-nord-frost text-white font-bold rounded-full hover:opacity-90 transition active:scale-95 shadow-md"
        >
          <LuPlus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filter & Search Bar - Matches Products Size */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-nord-600"
            size={18}
          />
          <input
            type="search"
            placeholder="Search for customer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-2 bg-white border border-nord-100 rounded-xl outline-none focus:border-nord-purple transition shadow-sm"
          />
        </div>
      </div>

      {/* Table Container - Matches Products Style */}
      <div className="w-full border border-nord-100 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-nord-50 font-belanosima text-nord-600 uppercase text-xs tracking-widest border-b border-nord-100">
            <tr>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4 w-1/3">Email Address</th>
              <th className="px-6 py-4 w-40">Phone</th>
              <th className="px-6 py-4 w-32 text-center">Gender</th>
              <th className="px-6 py-4 text-center w-32">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-nord-50">
            {currentCustomers.length > 0 ? (
              currentCustomers.map((c, index) => (
                <tr
                  key={c.id}
                  className={`
                    group transition-all duration-200
                    ${(index + 1) % 2 === 0 ? "bg-white" : "bg-nord-frost/5"} 
                    hover:bg-nord-frost/10
                  `}
                >
                  {/* Name Cell */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-nord-800 truncate">
                      {c.cusName}
                    </div>
                    <div className="text-[10px] text-nord-400 font-black uppercase tracking-widest mt-0.5">
                      Registered Member
                    </div>
                  </td>

                  {/* Email Cell */}
                  <td className="px-6 py-4 text-nord-500 font-medium truncate">
                    {c.email}
                  </td>

                  {/* Phone Cell */}
                  <td className="px-6 py-4 text-nord-500 font-mono italic">
                    +855 {c.phone}
                  </td>

                  {/* Gender Cell */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        c.gender === "Male"
                          ? "bg-nord-frost/20 text-nord-frost"
                          : "bg-nord-red/20 text-nord-red"
                      }`}
                    >
                      {c.gender}
                    </span>
                  </td>

                  {/* Actions Cell */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          handleUpdate(c);
                          document.getElementById("customer_modal").showModal();
                        }}
                        className="p-2 text-nord-600 hover:text-nord-purple transition-colors"
                      >
                        <LuPencil size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(c.id);
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
                  No customers found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Bar - Matches Products */}
        <div className="px-6 py-4 bg-nord-50/50 border-t border-nord-100 flex items-center justify-between">
          <p className="text-xs text-nord-600 font-bold uppercase tracking-tighter">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCustomers.length)} of{" "}
            {filteredCustomers.length}
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

      <CustomerModal
        refreshCustomers={fetchCustomers}
        edit={edit}
        setEdit={setEdit}
        formData={formData}
        setFormData={setFormData}
      />
      <ConfirmDelete id={selectedId} onConfirm={handleDelete} />
    </div>
  );
}
