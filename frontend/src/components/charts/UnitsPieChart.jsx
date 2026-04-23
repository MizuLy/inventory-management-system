import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getOrders } from "../../api/orders";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function UnitsPieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getOrders().then((res) => {
      const unitsMap = {};
      res.data.forEach((order) => {
        order.items?.forEach((item) => {
          unitsMap[item.prodName] =
            (unitsMap[item.prodName] || 0) + (Number(item.quantity) || 1);
        });
      });
      setData({
        labels: Object.keys(unitsMap),
        datasets: [
          {
            data: Object.values(unitsMap),
            backgroundColor: [
              "#4fc3f7",
              "#81c784",
              "#fff176",
              "#ba68c8",
              "#ef5350",
              "#ffb74d",
            ],
            borderWidth: 4,
            borderColor: "#ffffff",
          },
        ],
      });
    });
  }, []);

  if (!data) return null;

  return (
    <div className="w-full h-full p-4">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 10,
                padding: 25,
                font: { size: 14, weight: "800", family: "Inter" },
                color: "#64748b",
                usePointStyle: true,
              },
            },
          },
        }}
      />
    </div>
  );
}
