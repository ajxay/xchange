import { useEffect } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

export default function ChartLine() {
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Fulfilled",
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            data: [1, 4, 6, 4, 8, 3, 3],
            fill: false,
          },
          {
            label: "Pending",
            fill: false,
            backgroundColor: "#ff9800",
            borderColor: "#ff9800",
            data: [0, 6, 3, 4, 6, 8, 8],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <Card className="mb-10">
      <CardHeader color="yellow" contentPosition="left">
        <h6 className="uppercase text-slate-600 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-slate-600 font-medium text-2xl">Total Exchange</h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="line-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}
