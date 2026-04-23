import { TbUsersGroup } from "react-icons/tb";
import {
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
} from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";
import { FiRefreshCw } from "react-icons/fi";

import "cally";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getOrders, updateStatus } from "../api/orders";
import ReceiptModal from "../components/ReceiptModal";
import OrderModal from "../components/OrderModal";

export default function Customers() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateStatus(id, status);
      toast.success(`Status changed to ${status}`);
      fetchOrders();
      document.activeElement.blur();
    } catch (err) {
      toast.error("Failed to change status");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = orders.filter((o) => {
    const matchesSearch = Object.values(o)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDate = selectedDate
      ? new Date(o.created_at).toLocaleDateString("en-CA") === selectedDate
      : true;

    return matchesSearch && matchesDate;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = handleSearch.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(handleSearch.length / itemsPerPage);

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-nord-green/20 text-nord-green";
      case "Cancelled":
        return "bg-nord-red/20 text-nord-red";
      default:
        return "bg-nord-yellow/20 text-nord-yellow";
    }
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 font-belanosima text-3xl text-nord-900">
          <div className="p-2 bg-nord-yellow/10 rounded-lg">
            <TbUsersGroup className="text-nord-yellow" />
          </div>
          <span>Orders</span>
        </div>

        <button
          onClick={() => document.getElementById("order_modal").showModal()}
          className="flex items-center gap-2 px-6 py-2 bg-nord-yellow text-white font-bold rounded-full hover:opacity-90 transition active:scale-95 shadow-md"
        >
          <LuPlus size={20} />
          <span>Add Order</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md group">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-nord-600 group-focus-within:text-nord-yellow transition-colors"
            size={18}
          />
          <input
            type="search"
            placeholder="Search for orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-2 bg-white border border-nord-100 rounded-xl outline-none focus:border-nord-yellow transition shadow-sm"
          />
        </div>

        <div className="relative">
          <button
            popoverTarget="cally-popover1"
            className="px-6 py-2 bg-white border border-nord-100 rounded-xl font-bold text-nord-600 hover:bg-nord-50 transition shadow-sm flex items-center gap-2"
            id="cally1"
            style={{ anchorName: "--cally1" }}
          >
            Pick a date
          </button>
          <div
            popover="auto"
            id="cally-popover1"
            className="bg-white rounded-2xl shadow-xl border border-nord-100 p-2"
            style={{ positionAnchor: "--cally1" }}
          >
            <calendar-date
              className="cally"
              onchange={(e) => {
                const date = e.target.value;
                document.getElementById("cally1").innerText = date;
                setSelectedDate(date);
              }}
            >
              <svg
                aria-label="Previous"
                className="fill-current size-4"
                slot="previous"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
              </svg>
              <svg
                aria-label="Next"
                className="fill-current size-4"
                slot="next"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
              <calendar-month></calendar-month>
            </calendar-date>
          </div>
        </div>
        <button
          onClick={() => location.reload()}
          className="p-3 bg-white rounded-xl shadow-sm border border-nord-100 active:scale-95 transition-transform"
        >
          <div className="hover:rotate-180 hover:scale-110 transition-all duration-300 flex items-center justify-center text-nord-600">
            <FiRefreshCw size={18} />
          </div>
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full border border-nord-100 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-nord-50 font-belanosima text-nord-600 uppercase text-xs tracking-widest border-b border-nord-100">
            <tr>
              <th className="px-6 py-4 w-1/4">Customer</th>
              <th className="px-6 py-4 w-1/3">Items Summary</th>
              <th className="px-6 py-4 w-32">Total Price</th>
              <th className="px-6 py-4 w-44">Date & Time</th>
              <th className="px-6 py-4 w-36">Status</th>
              <th className="px-6 py-4 text-center w-24">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-nord-50">
            {currentItems.length > 0 ? (
              currentItems.map((o, index) => (
                <tr
                  key={o.id}
                  className={`
                    group transition-all duration-200
                    ${(index + 1) % 2 === 0 ? "bg-white" : "bg-nord-yellow/5"} 
                    hover:bg-nord-yellow/10
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-nord-800 truncate">
                      {o.cusName || "Unknown Customer"}
                    </div>
                    <div className="text-[10px] text-nord-400 font-black uppercase tracking-widest mt-0.5">
                      Order ID: #{o.id.toString().slice(-4)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-nord-600 space-y-1">
                      {o.items?.map((item, i) => (
                        <div key={i} className="truncate line-clamp-1">
                          <span className="font-bold text-nord-yellow">
                            x{item.quantity}
                          </span>{" "}
                          {item.prodName}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-nord-yellow font-black italic">
                    ${Number(o.totalPrice).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-xs text-nord-500 leading-relaxed font-medium">
                    {new Date(o.created_at).toLocaleDateString()} <br />
                    <span className="text-nord-400">
                      {new Date(o.created_at).toLocaleTimeString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${getStatusColor(o.status)}`}
                      >
                        {o.status}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-white rounded-xl z-20 w-40 p-2 shadow-xl border border-nord-100 mt-2"
                      >
                        <li onClick={() => handleStatus(o.id, "Pending")}>
                          <a className="text-nord-yellow hover:bg-nord-yellow/10">
                            Pending
                          </a>
                        </li>
                        <li onClick={() => handleStatus(o.id, "Completed")}>
                          <a className="text-nord-green hover:bg-nord-green/10">
                            Completed
                          </a>
                        </li>
                        <li onClick={() => handleStatus(o.id, "Cancelled")}>
                          <a className="text-nord-red hover:bg-nord-red/10">
                            Cancelled
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedId(o.id);
                          document.getElementById("receipt_modal").showModal();
                        }}
                        className="p-2 text-nord-600 hover:text-nord-yellow hover:bg-white rounded-lg transition-all"
                      >
                        <CgDetailsMore size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-20 text-center text-nord-400 italic"
                >
                  No orders found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-nord-50/50 border-t border-nord-100 flex items-center justify-between">
          <p className="text-xs text-nord-600 font-bold uppercase tracking-tighter">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, handleSearch.length)} of{" "}
            {handleSearch.length}
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
                      ? "bg-nord-yellow text-white"
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

      <OrderModal refreshOrders={fetchOrders} />
      <ReceiptModal id={selectedId} />
    </div>
  );
}
