import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    // 1. Set the base background to the light grey (nord-50/50) instead of white
    <div className="flex h-screen overflow-hidden bg-nord-50/50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      {/* 2. Removed bg-nord-50/50 from here since it's now on the parent */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* 3. The content container */}
          <div className="max-w-[1600px] mx-auto p-6 lg:p-10 w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
