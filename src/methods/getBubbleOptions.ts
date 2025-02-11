type BubbleData = {
  x: number;
  y: number;
  z: any;
}[];

export const getBubbleOptions = (
  bubbleData: BubbleData,
  numberOfPosts: number
) => {
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

  return optionsBubble;
};
