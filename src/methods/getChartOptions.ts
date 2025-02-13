import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { Weekday } from "@/common/Weekday";

export const getChartOptions = (
  sodiaStatistics: SodiaStatistics[],
  media: MediaType,
  isHeatmap?: boolean
) => {
  const dataMatrix = new Array(7).fill(0).map(() => new Array(24).fill(0));
  sodiaStatistics
    .filter((statistics) => statistics.media === media)
    .map((stat) => {
      dataMatrix[Object.keys(Weekday).indexOf(stat.weekday)][stat.hour] +=
        stat.count;
    });

  const bubbleData = dataMatrix.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => ({
      x: hourIndex,
      y: dayIndex,
      z: count,
    }))
  );
  const numberOfPosts = bubbleData.reduce((n, { z }) => n + z, 0);

  const optionsBubble = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: `Social media posts by weekday and hour: ${numberOfPosts} posts`,
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        enabled: false,
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
      startOnTick: false,
      endOnTick: false,
      title: {
        enabled: false,
      },
      reversed: true,
      labels: {
        format: "{value}",
      },
      categories: ["Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "Sun"],
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
    plotOptions: {
      bubble: {
        minSize: 1,
        maxSize: "10%",
      },
    },
    series: [
      {
        data: bubbleData,
      },
    ],
  };

  const heatmapData = dataMatrix.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => [hourIndex, dayIndex, count])
  );

  const optionsHeatmap = {
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

  const chartOptions = isHeatmap ? optionsHeatmap : optionsBubble;

  return chartOptions;
};
