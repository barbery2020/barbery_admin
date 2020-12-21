import React from "react";
import axios from "axios";
import config from "./config";
const colors = config.app.colors;
const { inverse, info, primary, danger, warning, success } = colors;

let columnColors = [
  inverse,
  primary,
  info,
  success,
  warning,
  danger,
  "#EC2A00",
  "#FF8C22",
];

export const chartData = {
  apex: {
    column: {
      series: [
        {
          data: [
            300,
            280,
            280,
            230,
            190,
            270,
            290,
            230,
            260,
            290,
            300,
            250,
            270,
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: columnColors,
        plotOptions: {
          bar: {
            columnWidth: "30%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
      },
    },
    pie: {
      series: [124, 234, 121],
      options: {
        chart: {
          type: "donut",
        },
        colors: [warning, "#323232", danger],
        labels: ["On progress", "Canceled", "Booked"],
        stroke: {
          show: false,
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "45%",
            },
          },
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  },
};

export class chartsMocks extends React.Component {
  constructor() {
    super();
    this.state = {
      totalAppointments: null,
      appointmentsPending: null,
      appointmentsCompleted: null,
    };
  }
  getRecords = async () => {
    await axios
      .get("http://barbery.herokuapp.com/api/admin/records")
      .then((res) => {
        console.log(res.data);
        this.setState({
          appointmentsCompleted: res.data[2].appointmentCompleted,
          appointmentsPending: res.data[3].appointmentPending,
          totalAppointments: res.data[4].totalAppointments,
        });
        console.log(this.state.appointmentsCompleted);
        console.log(this.state.appointmentsPending);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getRecords();
  }
  render() {
    return <div></div>;
  }
}
