import React, { useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Line } from "react-chartjs-2";
import classes from "./LineChart.module.css";
function LineChart(props: any) {
  console.log(props.ChosenIndex, "Index");
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
        labels: {
          filter: function (legendItem: any, data: any) {
            return legendItem.index != 1;
          },
        },
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
  const chart = "myChart";
  console.log(chart, "visible");

  return (
    <Line
      id="myChart"
      className={classes.chart}
      data={data}
      options={options}
    />
  );
}
export default LineChart;
