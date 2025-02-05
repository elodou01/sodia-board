import { Highcharts } from "./highchartsLazyLoad";

export const Chart = () => {
  const optionsBubble = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zooming: {
        type: "xy",
      },
    },

    legend: {
      enabled: false,
    },

    title: {
      text: "Sugar and fat intake per country",
    },
    subtitle: {
      text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>',
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, fat: {point.x}g, " +
          "sugar: {point.y}g, obesity: {point.z}%.",
      },
    },

    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Daily fat intake",
      },
      labels: {
        format: "{value} gr",
      },
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 65,
          label: {
            rotation: 0,
            y: 15,
            style: {
              fontStyle: "italic",
            },
            text: "Safe fat intake 65g/day",
          },
          zIndex: 3,
        },
      ],
      accessibility: {
        rangeDescription: "Range: 60 to 100 grams.",
      },
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "Daily sugar intake",
      },
      labels: {
        format: "{value} gr",
      },
      maxPadding: 0.2,
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 50,
          label: {
            align: "right",
            style: {
              fontStyle: "italic",
            },
            text: "Safe sugar intake 50g/day",
            x: -10,
          },
          zIndex: 3,
        },
      ],
      accessibility: {
        rangeDescription: "Range: 0 to 160 grams.",
      },
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        "<tr><th>Fat intake:</th><td>{point.x}g</td></tr>" +
        "<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>" +
        "<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },

    series: [
      {
        data: [
          { x: 95, y: 95, z: 13.8, name: "BE", country: "Belgium" },
          { x: 86.5, y: 102.9, z: 14.7, name: "DE", country: "Germany" },
          { x: 80.8, y: 91.5, z: 15.8, name: "FI", country: "Finland" },
          { x: 80.4, y: 102.5, z: 12, name: "NL", country: "Netherlands" },
          { x: 80.3, y: 86.1, z: 11.8, name: "SE", country: "Sweden" },
          { x: 78.4, y: 70.1, z: 16.6, name: "ES", country: "Spain" },
          { x: 74.2, y: 68.5, z: 14.5, name: "FR", country: "France" },
          { x: 73.5, y: 83.1, z: 10, name: "NO", country: "Norway" },
          { x: 71, y: 93.2, z: 24.7, name: "UK", country: "United Kingdom" },
          { x: 69.2, y: 57.6, z: 10.4, name: "IT", country: "Italy" },
          { x: 68.6, y: 20, z: 16, name: "RU", country: "Russia" },
          {
            x: 65.5,
            y: 126.4,
            z: 35.3,
            name: "US",
            country: "United States",
          },
          { x: 65.4, y: 50.8, z: 28.5, name: "HU", country: "Hungary" },
          { x: 63.4, y: 51.8, z: 15.4, name: "PT", country: "Portugal" },
          { x: 64, y: 82.9, z: 31.3, name: "NZ", country: "New Zealand" },
        ],
        colorByPoint: true,
      },
    ],
  };

  const optionsHeatmap = {
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },

    title: {
      text: "Sales per employee per weekday",
      style: {
        fontSize: "1em",
      },
    },

    xAxis: {
      categories: [
        "Alexander",
        "Marie",
        "Maximilian",
        "Sophia",
        "Lukas",
        "Maria",
        "Leon",
        "Anna",
        "Tim",
        "Laura",
      ],
    },

    yAxis: {
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      title: null,
      reversed: true,
    },

    accessibility: {
      point: {
        descriptionFormat:
          "{(add index 1)}. " +
          "{series.xAxis.categories.(x)} sales " +
          "{series.yAxis.categories.(y)}, {value}.",
      },
    },

    colorAxis: {
      min: 0,
      minColor: "#FFFFFF",
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },

    tooltip: {
      format:
        "<b>{series.xAxis.categories.(point.x)}</b> sold<br>" +
        "<b>{point.value}</b> items on <br>" +
        "<b>{series.yAxis.categories.(point.y)}</b>",
    },

    series: [
      {
        name: "Sales per employee",
        borderWidth: 1,
        data: [
          [0, 0, 10],
          [0, 1, 19],
          [0, 2, 8],
          [0, 3, 24],
          [0, 4, 67],
          [1, 0, 92],
          [1, 1, 58],
          [1, 2, 78],
          [1, 3, 117],
          [1, 4, 48],
          [2, 0, 35],
          [2, 1, 15],
          [2, 2, 123],
          [2, 3, 64],
          [2, 4, 52],
          [3, 0, 72],
          [3, 1, 132],
          [3, 2, 114],
          [3, 3, 19],
          [3, 4, 16],
          [4, 0, 38],
          [4, 1, 5],
          [4, 2, 8],
          [4, 3, 117],
          [4, 4, 115],
          [5, 0, 88],
          [5, 1, 32],
          [5, 2, 12],
          [5, 3, 6],
          [5, 4, 120],
          [6, 0, 13],
          [6, 1, 44],
          [6, 2, 88],
          [6, 3, 98],
          [6, 4, 96],
          [7, 0, 31],
          [7, 1, 1],
          [7, 2, 82],
          [7, 3, 32],
          [7, 4, 30],
          [8, 0, 85],
          [8, 1, 97],
          [8, 2, 123],
          [8, 3, 64],
          [8, 4, 84],
          [9, 0, 47],
          [9, 1, 114],
          [9, 2, 31],
          [9, 3, 48],
          [9, 4, 91],
        ],
        dataLabels: {
          enabled: true,
          color: "#000000",
        },
      },
    ],
  };

  return <Highcharts options={optionsBubble} />;
};
