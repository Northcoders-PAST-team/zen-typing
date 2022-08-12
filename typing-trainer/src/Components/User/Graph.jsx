import { useState } from "react";
import { Chart } from "react-google-charts";

const Graph = ({ wordsPerMinData, difficulty }) => {
  //get data probably from game database?
  const wordsPerMin = JSON.stringify([["game", "W/M"], ...wordsPerMinData]);

  const easy = difficulty.filter((level) => {
    return level === "easy";
  });
  const medium = difficulty.filter((level) => {
    return level === "medium";
  });
  const hard = difficulty.filter((level) => {
    return level === "hard";
  });

  const difficultyData = JSON.stringify([
    ["Difficulty", "Count"],
    ["easy", easy.length],
    ["medium", medium.length],
    ["hard", hard.length],
  ]);

  //state for data going in
  const [data, setData] = useState(wordsPerMin);
  const [chart, setChartType] = useState("Line");
  const options = {
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
  };

  const chartCheck = () => {
    if (data === wordsPerMin) {
      setChartType("Bar");
    } else {
      setChartType("Line");
    }
  };

  return (
    <div className="graph">
      <select
        name="graph"
        id=""
        onChange={(e) => {
          setData(e.target.value);
          chartCheck();
        }}
      >
        <option value={wordsPerMin}>wordsPerMin every game</option>
        <option value={difficultyData}>difficulty level</option>
      </select>
      <Chart
        chartType={chart}
        data={JSON.parse(data)}
        width="600px"
        height="400px"
        legendToggle
        options={options}
      />
    </div>
  );
};

export default Graph;
