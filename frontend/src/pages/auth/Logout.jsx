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
    <div className="min-h-screen w-full flex items-center justify-center bg-nord-50 p-4 font-belanosima relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-nord-frost/10 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white border border-nord-200 p-10 rounded-[2.5rem] shadow-xl shadow-nord-900/5 text-center">
          {/* Decorative Logout Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-nord-frost text-white rounded-3xl flex items-center justify-center shadow-lg shadow-nord-frost/30 group transition-all duration-300">
              <LuLogOut
                size={40}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl text-nord-900 mb-3 tracking-tight">
            End Session?
          </h1>
          <p className="text-nord-700 mb-10 text-base font-sans font-bold leading-relaxed">
            Ready to log out of{" "}
            <span className="text-nord-frost font-black underline decoration-2 underline-offset-4">
              KS GROUP
            </span>
            ? <br />
            Your session will be securely ended.
          </p>

          {/* Action Stack */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-nord-frost text-white font-black rounded-2xl hover:brightness-95 active:scale-[0.98] transition-all shadow-md shadow-nord-frost/20 uppercase tracking-widest text-xs"
            >
              Confirm Log Out
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-nord-100 text-nord-900 font-black rounded-2xl hover:bg-nord-200 transition-all group border border-transparent"
            >
              <LuArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform text-nord-600"
              />
              <span className="uppercase tracking-widest text-xs">
                Back to Safety
              </span>
            </button>
          </div>

          {/* Subtle Footer */}
          <div className="mt-12 pt-6 border-t border-nord-50">
            <p className="text-nord-900 text-[10px] uppercase tracking-[0.3em] font-black opacity-30">
              System Node: Secure Exit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
