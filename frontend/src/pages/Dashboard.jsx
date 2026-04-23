import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import {
  LuLayoutDashboard,
  LuActivity,
  LuPackage,
  LuDollarSign,
  LuUsers,
  LuTrendingUp,
} from "react-icons/lu";
import { RevenueDonutChart } from "../components/charts/RevenueDonutChart";
import { UnitsPieChart } from "../components/charts/UnitsPieChart";
import { GenderBarChart } from "../components/charts/GenderBarChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    monthRev: 0,
    totalOrders: 0,
    totalRev: 0,
  });
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      const orders = res.data;
      const now = new Date();
      let mRev = 0,
        tRev = 0;
      const customerMap = {};

      orders.forEach((order) => {
        const price = Number(order.totalPrice || 0);
        tRev += price;
        if (new Date(order.created_at).getMonth() === now.getMonth())
          mRev += price;
        const name = order.cusName || "Guest";
        customerMap[name] = (customerMap[name] || 0) + price;
      });

      const sorted = Object.entries(customerMap)
        .map(([name, spent]) => ({ name, spent }))
        .sort((a, b) => b.spent - a.spent)
        .slice(0, 5); // Increased to 5 for the new scrollable list style

      setStats({
        monthRev: mRev.toLocaleString(),
        totalOrders: orders.length,
        totalRev: tRev.toLocaleString(),
      });
      setTopCustomers(sorted);
    });
  }, []);

  return (
    <div className="w-full">
      {/* Header Section - Matching Product Style */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3 font-belanosima text-3xl text-nord-900">
          <div className="p-2 rounded-lg">
            <LuLayoutDashboard className="text-nord-frost" />
          </div>
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-2 px-6 py-2 bg-nord-frost/10 text-nord-frost font-bold rounded-full border border-nord-frost/20">
          <div className="w-2 h-2 bg-nord-green rounded-full animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Live System</span>
        </div>
      </div>

      {/* Stats Cards - Updated to match Product Table Card style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthRev}`}
          icon={<LuActivity />}
          color="frost"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<LuPackage />}
          color="purple"
        />
        <StatCard
          title="Total Sales"
          value={`$${stats.totalRev}`}
          icon={<LuDollarSign />}
          color="green"
        />
        <StatCard
          title="Active Users"
          value="Online"
          icon={<LuUsers />}
          color="orange"
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sales Volume - Larger Card */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-nord-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-belanosima text-nord-600 uppercase text-xs tracking-widest">
              Sales Volume Analysis
            </h3>
            <LuTrendingUp className="text-nord-200" />
          </div>
          <div className="h-[300px] w-full">
            <UnitsPieChart />
          </div>
        </div>

        {/* Revenue Share - Circular Chart */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-nord-100 shadow-sm">
          <h3 className="font-belanosima text-nord-600 uppercase text-xs tracking-widest mb-6">
            Revenue Share
          </h3>
          <div className="h-[300px] w-full">
            <RevenueDonutChart />
          </div>
        </div>

        {/* Demographics */}
        <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl border border-nord-100 shadow-sm">
          <h3 className="font-belanosima text-nord-600 uppercase text-xs tracking-widest mb-6">
            Customer Demographics
          </h3>
          <div className="h-[300px] w-full">
            <GenderBarChart />
          </div>
        </div>

        {/* Top Customers - Styled like the Product Table List */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-nord-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-nord-50 bg-nord-50/30">
            <h3 className="font-belanosima text-nord-600 uppercase text-xs tracking-widest">
              Top Spenders
            </h3>
          </div>
          <div className="divide-y divide-nord-50 overflow-y-auto">
            {topCustomers.map((c, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-6 py-4 hover:bg-nord-frost/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-nord-frost/10 flex items-center justify-center text-nord-frost font-black text-[10px]">
                    {i + 1}
                  </div>
                  <span className="font-semibold text-nord-800">{c.name}</span>
                </div>
                <span className="font-bold text-matcha-deep italic">
                  ${c.spent.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    frost: "text-nord-frost bg-nord-frost/10",
    purple: "text-purple-500 bg-purple-50",
    green: "text-nord-green bg-nord-green/10",
    orange: "text-orange-500 bg-orange-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-nord-100 shadow-sm flex items-center justify-between group hover:border-nord-frost/30 transition-all duration-300">
      <div>
        <p className="text-xs font-black text-nord-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <p className="text-2xl font-black text-nord-900">{value}</p>
      </div>
      <div
        className={`p-4 rounded-xl text-2xl transition-transform group-hover:scale-110 duration-300 ${colors[color]}`}
      >
        {icon}
      </div>
    </div>
  );
}
