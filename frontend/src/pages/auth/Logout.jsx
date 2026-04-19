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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden p-4 font-instrumentsans">
      {/* Sunset Horizon Glow - Matches Login */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-orange-600/10 via-red-900/5 to-transparent pointer-events-none"></div>

      {/* Setting Sun Bloom */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-red-600 opacity-[0.05] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#0D0D0D]/60 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] text-center">
          {/* Decorative Logout Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500/10 to-red-600/20 text-red-500 rounded-[2rem] flex items-center justify-center border border-red-500/20 shadow-inner group transition-all duration-500 hover:scale-105">
              <LuLogOut
                size={48}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="font-belanosima text-4xl text-white mb-3 tracking-tighter">
            End Session?
          </h1>
          <p className="text-white/40 mb-10 text-base leading-relaxed">
            Ready to log out of{" "}
            <span className="text-orange-500 font-bold">KS GROUP</span>? Your
            session will be securely terminated.
          </p>

          {/* Action Stack */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-red-900/30 uppercase tracking-widest text-xs"
            >
              Terminate Session
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 text-white/60 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all group border border-white/5"
            >
              <LuArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="uppercase tracking-widest text-xs">
                Stay Signed In
              </span>
            </button>
          </div>

          {/* Subtle Footer */}
          <div className="mt-12">
            <p className="text-white/10 text-[10px] uppercase tracking-[0.4em] font-black">
              System Node: Secure Exit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
