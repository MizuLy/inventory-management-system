import React from "react";

export default function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button
        onClick={() => console.log("Hehe")}
        className="bg-white/5 border border-white/10 backdrop-blur-md h-[64px] rounded-full px-6 md:px-8 flex justify-between items-center shadow-2xl outline-none"
      >
        Hehe
      </button>
    </div>
  );
}
