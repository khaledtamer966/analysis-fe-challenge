import React, { useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import classes from "./LineChart.module.css";
Chart.register(...registerables);
function LineChart(props: any) {
  const chartRef = useRef<Chart<"line", number[], string>>(null);

  let data = {
    labels: props.labels,
    datasets: props.datasets,
  };

  const options: any = {
    onHover: (event: any, chartElement: any) => {
      if (chartElement[0]) {
        console.log(chartElement[0].datasetIndex);
        console.log(data.datasets[chartElement[0].datasetIndex]);
        data.datasets[chartElement[0].datasetIndex].borderWidth = 7;
      } else {
        data.datasets.map((item: any) => (item.borderWidth = 3));
      }
      chartRef.current?.update();
    },
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

  return (
    <Line
      ref={chartRef}
      className={classes.chart}
      data={data}
      options={options}
    />
  );
}
export default LineChart;
