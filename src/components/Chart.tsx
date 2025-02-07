import { MediaType } from "@/types/MediaType";
import { SodiaStatistics } from "@/types/SodiaStatistics";
import { Weekday } from "@/types/Weekday";
import { Highcharts } from "./highchartsLazyLoad";

type Props = {
  sodiaStatistics: SodiaStatistics[];
  media: MediaType;
};

export const Chart = ({ sodiaStatistics, media }: Props) => {
  const initialCounts = new Array(7).fill(0).map(() => new Array(24).fill(0));
  sodiaStatistics
    .filter((statistics) => statistics.media === media)
    .map((stat) => {
      initialCounts[Object.keys(Weekday).indexOf(stat.weekday)][stat.hour] +=
        stat.count;
    });

  const bubbleData = initialCounts.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => ({
      x: hourIndex,
      y: dayIndex,
      z: count,
    }))
  );

  const heatMapData = initialCounts.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => [hourIndex, dayIndex, count])
  );

  const optionsBubble = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "Social media posts by weekday and hour ",
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

  const optionsHeatMap = {
    chart: {
      type: "heatmap",
      plotBorderWidth: 1,
    },
    title: {
      text: "Social media posts by weekday and hour",
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
        data: heatMapData,
        dataLabels: {
          enabled: true,
          color: "#000000",
        },
      },
    ],
  };

  return (
    <>
      <Highcharts options={optionsHeatMap} />
      <Highcharts options={optionsBubble} />
    </>
  );
};
