import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getOrders } from "../../api/orders";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function RevenueDonutChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getOrders().then((res) => {
      const revMap = res.data.reduce((acc, order) => {
        order.items?.forEach((item) => {
          acc[item.prodName] =
            (acc[item.prodName] || 0) +
            Number(item.price) * (item.quantity || 1);
        });
        return acc;
      }, {});
      setData({
        labels: Object.keys(revMap),
        datasets: [
          {
            data: Object.values(revMap),
            backgroundColor: [
              "#ebcb8b",
              "#a3be8c",
              "#b48ead",
              "#88c0d0",
              "#bf616a",
            ],
            hoverOffset: 10,
          },
        ],
      });
    });
  }, []);

  if (!data) return null;

  return (
    <div className="w-full h-full p-2">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { boxWidth: 8, font: { size: 12 }, padding: 8 },
            },
          },
        }}
      />
    </div>
  );
}
