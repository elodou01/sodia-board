import { MediaType } from "@/types/MediaType";
import { SodiaStatistics } from "@/types/SodiaStatistics";
import { Weekday } from "@/types/Weekday";
import { Highcharts } from "./highchartsLazyLoad";

type Props = {
  sodiaStatistics: SodiaStatistics[];
  media: MediaType;
};

export const Chart = ({ sodiaStatistics, media }: Props) => {
  const chartData = sodiaStatistics
    .filter((statistics) => statistics.media === media)
    .map((stat) => ({
      x: stat.hour,
      y: Object.keys(Weekday).indexOf(stat.weekday),
      z: stat.count,
    }));

  const optionsBubble = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
    },
    legend: {
      enabled: false,
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
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "Weekday",
      },
      labels: {
        format: "{value}",
      },
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.z}",
        },
      },
    },
    series: [
      {
        data: chartData,
        colorByPoint: false,
      },
    ],
  };

  return <Highcharts options={optionsBubble} />;
};
