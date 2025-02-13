import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { getChartOptions } from "@/methods/getChartOptions";
import {
  mockComplexBubbleChart,
  mockComplexData,
  mockComplexHeatmap,
  mockEmptyBubbleChart,
  mockEmptyHeatmap,
  mockSimpleBubbleChart,
  mockSimpleData,
  mockSimpleHeatmap,
} from "../__mock__/mockData";

describe("getChartOptions", () => {
  it("should return an empty bubble chart with no input data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = [];
    const media = MediaType.FacebookStatus;
    const isHeatmap = false;

    const mockOptions = {
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: `Social media posts by weekday and hour: 0 posts`,
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
          data: mockEmptyBubbleChart,
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return a bubble chart with simple data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = mockSimpleData;
    const media = MediaType.TiktokVideo;
    const isHeatmap = false;

    const mockOptions = {
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: `Social media posts by weekday and hour: 51 posts`,
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
          data: mockSimpleBubbleChart,
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return a bubble chart with complex data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = mockComplexData;
    const media = MediaType.TiktokVideo;
    const isHeatmap = false;

    const mockOptions = {
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: `Social media posts by weekday and hour: 69 posts`,
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
          data: mockComplexBubbleChart,
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return an empty heatmap with no input data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = [];
    const media = MediaType.FacebookStatus;
    const isHeatmap = true;

    const mockOptions = {
      chart: {
        type: "heatmap",
        plotBorderWidth: 1,
      },
      title: {
        text: `Social media posts by weekday and hour: 0 posts`,
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
          data: mockEmptyHeatmap,
          dataLabels: {
            enabled: true,
            color: "#000000",
          },
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return an empty heatmap with no input data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = [];
    const media = MediaType.FacebookStatus;
    const isHeatmap = true;

    const mockOptions = {
      chart: {
        type: "heatmap",
        plotBorderWidth: 1,
      },
      title: {
        text: `Social media posts by weekday and hour: 0 posts`,
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
          data: mockEmptyHeatmap,
          dataLabels: {
            enabled: true,
            color: "#000000",
          },
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return a heatmap with simple data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = mockSimpleData;
    const media = MediaType.TiktokVideo;
    const isHeatmap = true;

    const mockOptions = {
      chart: {
        type: "heatmap",
        plotBorderWidth: 1,
      },
      title: {
        text: `Social media posts by weekday and hour: 51 posts`,
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
          data: mockSimpleHeatmap,
          dataLabels: {
            enabled: true,
            color: "#000000",
          },
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });

  it("should return a heatmap with complex data", () => {
    const mockSodiaStatistics: SodiaStatistics[] = mockComplexData;
    const media = MediaType.TiktokVideo;
    const isHeatmap = true;

    const mockOptions = {
      chart: {
        type: "heatmap",
        plotBorderWidth: 1,
      },
      title: {
        text: `Social media posts by weekday and hour: 69 posts`,
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
          data: mockComplexHeatmap,
          dataLabels: {
            enabled: true,
            color: "#000000",
          },
        },
      ],
    };

    const chartOptions = getChartOptions(mockSodiaStatistics, media, isHeatmap);
    expect(chartOptions).toEqual(mockOptions);
  });
});
