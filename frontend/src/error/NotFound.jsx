import React from "react";
import { useNavigate } from "react-router-dom";
import { LuGhost, LuArrowLeft } from "react-icons/lu";
import { GiTeleport } from "react-icons/gi";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden p-4">
      {/* Sunset Horizon Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-orange-600/10 via-red-900/5 to-transparent pointer-events-none"></div>

      {/* Setting Sun Bloom */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-orange-600 opacity-[0.05] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full text-center z-10">
        {/* The "Ghost" Icon in a Sunset Glass Box */}
        <div className="relative inline-block mb-10">
          <div className="w-36 h-36 bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] shadow-2xl flex items-center justify-center border border-white/10 animate-bounce duration-[3s]">
            <LuGhost
              size={70}
              className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]"
            />
          </div>
          <div className="w-24 h-2 bg-orange-600/20 rounded-full mx-auto mt-6 blur-xl"></div>
        </div>

        {/* Text Content */}
        <h1 className="font-belanosima text-7xl text-white mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-xl font-bold text-white/90 mb-4 uppercase tracking-[0.1em]">
          Lost in the Afterglow
        </h2>
        <p className="text-white/40 mb-12 leading-relaxed text-sm">
          This path has faded with the sun. It's either been deleted or it's
          currently hiding in a{" "}
          <code className="bg-white/5 px-2 py-1 rounded text-orange-400 font-mono text-xs">
            console.log
          </code>{" "}
          dimension.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <GiTeleport size={20} />
            <span>Teleport Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 text-white/40 font-bold rounded-2xl hover:text-white transition-all group"
          >
            <LuArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="uppercase tracking-widest text-[10px]">
              Return to Safety
            </span>
          </button>
        </div>

        {/* Subtle Joke Footer */}
        <div className="mt-20">
          <p className="text-white/10 text-[10px] uppercase tracking-[0.5em] font-black">
            System Error: Horizon_Not_Found
          </p>
        </div>
      </div>
    </div>
  );
}
