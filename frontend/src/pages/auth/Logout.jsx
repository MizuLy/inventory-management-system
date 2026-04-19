import React from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut, LuArrowLeft } from "react-icons/lu";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-dark p-4">
      {/* Container */}
      <div className="bg-nord-800 border border-nord-700 w-full max-w-md rounded-3xl shadow-2xl p-10 text-center">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-nord-red/10 text-nord-red rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
            <LuLogOut size={40} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="font-belanosima text-3xl text-nord-white mb-3">
          End Session?
        </h1>
        <p className="text-nord-400 mb-10 text-lg leading-relaxed">
          Are you sure you want to log out of{" "}
          <span className="text-nord-frost">KS GROUP</span>? You'll need to
          enter your credentials again to return.
        </p>

        {/* Vertical Action Stack */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-nord-red text-nord-white font-bold rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-nord-red/20 text-lg"
          >
            Confirm Logout
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-nord-700 text-nord-200 font-semibold rounded-2xl hover:bg-nord-600 hover:text-nord-white transition-all group"
          >
            <LuArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Go Back</span>
          </button>
        </div>

        {/* Subtle Footer */}
        <div className="mt-12">
          <p className="text-nord-600 text-xs uppercase tracking-[0.2em]">
            Secure Logout System
          </p>
        </div>
      </div>
    </div>
  );
}
