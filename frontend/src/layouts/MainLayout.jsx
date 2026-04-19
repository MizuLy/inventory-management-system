import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-nord-50/50 overflow-hidden">
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Centering the content for better readability on large screens */}
          <div className="max-w-[1600px] mx-auto p-6 lg:p-10 w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
