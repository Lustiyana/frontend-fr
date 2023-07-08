import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HorizontalBarChart() {
  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/articles?sort[0]=views%3Adesc&pagination[limit]=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data.data);
        setLoading(false);
      });
  }, []);
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const labels =
    fetchData && fetchData.map((article) => article.attributes.title);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: fetchData && fetchData.map((article) => article.attributes.views),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default HorizontalBarChart;
