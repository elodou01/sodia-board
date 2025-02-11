export const getHeatmapOptions = (
  heatmapData: number[][],
  numberOfPosts: number
) => {
  const optionsHeatMap = {
    chart: {
      type: "heatmap",
      plotBorderWidth: 1,
    },
    title: {
      text: `Social media posts by weekday and hour: ${numberOfPosts} posts`,
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Hour",
      },
      labels: {
        format: "{value}h",
      },
      categories: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
    },
    yAxis: {
      title: {
        text: "Weekday",
      },
      reversed: true,
      labels: {
        format: "{value}",
      },
      categories: ["Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun"],
      maxPadding: 0.2,
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        "<tr><th>Weekday: </th><td>{point.y}</td></tr>" +
        "<tr><th>Hour: </th><td>{point.x}h</td></tr>" +
        "<tr><th>Number of posts: </th><td>{point.z}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },
    colorAxis: {
      min: 0,
      minColor: "#FFFFFF",
      maxColor: "#470063",
    },
    series: [
      {
        data: heatmapData,
        dataLabels: {
          enabled: true,
          color: "#000000",
        },
      },
    ],
  };

  return optionsHeatMap;
};
