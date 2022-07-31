import React, { useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import classes from "./LineChart.module.css";
Chart.register(...registerables);
function LineChart(props: any) {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };
  const options: any = {
    title: {
      display: props.display,
      text: props.text,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          min: props.min,
          max: props.max,
          stepSize: props.stepSize,
        },
      },
    },
  };

  return <Line className={classes.chart} data={data} options={options} />;
}
export default LineChart;
