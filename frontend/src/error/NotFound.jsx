import React from "react";
import { useNavigate } from "react-router-dom";
import { LuGhost, LuArrowLeft } from "react-icons/lu";
import { GiTeleport } from "react-icons/gi";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-nord-50 relative overflow-hidden p-4 font-belanosima">
      {/* Subtle Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-nord-frost/10 to-transparent pointer-events-none"></div>

      <div className="max-w-md w-full text-center z-10">
        {/* Floating Ghost Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-36 h-36 bg-white rounded-[3rem] shadow-xl shadow-nord-900/5 flex items-center justify-center border border-nord-200 animate-bounce duration-[3s]">
            <LuGhost size={70} className="text-nord-frost drop-shadow-md" />
          </div>
          {/* Subtle Shadow beneath the bounce */}
          <div className="w-24 h-2 bg-nord-900/10 rounded-full mx-auto mt-6 blur-md animate-pulse"></div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl text-nord-900 mb-2 tracking-tighter">404</h1>
        <h2 className="text-xl font-black text-nord-800 mb-4 uppercase tracking-[0.1em]">
          Route Not Found
        </h2>
        <p className="text-nord-700 font-sans font-bold mb-10 leading-relaxed text-sm px-4">
          This path has vanished from the system. It's either been deleted or
          it's currently hiding in a{" "}
          <code className="bg-nord-200/50 px-2 py-1 rounded text-nord-frost font-mono text-xs">
            null
          </code>{" "}
          variable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-nord-frost text-white font-black rounded-2xl hover:brightness-95 transition-all active:scale-95 uppercase tracking-widest text-xs shadow-lg shadow-nord-frost/30"
          >
            <GiTeleport size={18} />
            <span>Teleport Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 text-nord-800 font-black rounded-2xl hover:bg-nord-100 transition-all group"
          >
            <LuArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform text-nord-600"
            />
            <span className="uppercase tracking-widest text-xs">Go Back</span>
          </button>
        </div>

        {/* Subtle Footer */}
        <div className="mt-16 pt-6 border-t border-nord-200/50">
          <p className="text-nord-900/30 text-[10px] uppercase tracking-[0.5em] font-black">
            Error Code: 0x404_VOID
          </p>
        </div>
      </div>
    </div>
  );
}
