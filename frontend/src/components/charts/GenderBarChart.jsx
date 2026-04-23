import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getCustomers } from "../../api/customers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function GenderBarChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCustomers().then((res) => {
      const m = res.data.filter((c) => c.gender === "Male").length;
      const f = res.data.filter((c) => c.gender === "Female").length;
      setData({
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Customers",
            data: [m, f],
            backgroundColor: ["#88c0d0", "#bf616a"],
            borderRadius: 6,
          },
        ],
      });
    });
  }, []);

  if (!data) return null;

  return (
    <div className="w-full h-full">
      <Bar
        data={data}
        // Inside GenderBarChart.jsx options
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { display: false, beginAtZero: true },
            x: { grid: { display: false }, ticks: { font: { size: 12 } } },
          },
        }}
      />
    </div>
  );
}
