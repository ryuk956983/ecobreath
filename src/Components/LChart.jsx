import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const LChart = () => {
  const [series, setseries] = useState([]);
  const [categories, setcategories] = useState([]);

  const [state, setstate] = useState({
    options: {
      chart: {
        height: "auto",
        type: "line",

        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark", // This sets the tooltip to a dark theme (black background)
        style: {
          fontSize: "14px",
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      markers: {
        size: 1,
      },
      xaxis: {
        categories,
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
          },
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
  });

  const coord = useSelector((state) => state.coordinatesSlice);

  useEffect(() => {
    let data = [];
    let data2 = [];
    let date = [];

    if (!coord.pending) {
      function formatFullDate(str) {
        const date = new Date(str);
        const options = { day: "numeric", month: "long" };
        return date.toLocaleDateString("en-US", options);
      }

      coord.data_first.hourly.time.map((el, ind) => {
        if (ind % 15 == 0) {
          date.push(formatFullDate(el));
        }
      });

      coord.data_first.hourly.pm2_5.map((el, ind) => {
        if (ind % 15 == 0) {
          data.push(el);
        }
      });
      coord.data_first.hourly.pm10.map((el, ind) => {
        if (ind % 15 == 0) {
          data2.push(el);
        }
      });

      let pm25 = {
        name: "PM 2.5",
        data: data,
      };
      let pm10 = {
        name: "PM 10",
        data: data2,
      };

      setstate((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: date,
          },
        },
      }));

      setseries([pm25, pm10]);
    }
  }, [coord]);

  return (
    <main className=" h-full">
      <Chart options={state.options} series={series} type="line" height={400} />
    </main>
  );
};

export default LChart;
