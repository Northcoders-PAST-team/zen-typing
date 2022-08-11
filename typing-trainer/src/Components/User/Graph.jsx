import { useState } from "react";
import { Chart } from "react-google-charts";

const Graph = ({ wordsPerMinData, difficulty }) => {
  const wordsPerMin = [["game", "W/M"], ...wordsPerMinData];

  const easy = difficulty.filter((level) => {
    return level === "easy";
  });
  const medium = difficulty.filter((level) => {
    return level === "medium";
  });
  const hard = difficulty.filter((level) => {
    return level === "hard";
  });

  const difficultyData = [
    ["Difficulty", "Count"],
    ["easy", easy.length],
    ["medium", medium.length],
    ["hard", hard.length],
  ];

  const [data, setData] = useState(wordsPerMin);
  const [chart, setChartType] = useState("");

  if (data === wordsPerMin) {
    setChartType("LineChart");
  } else if (data === difficultyData) {
    setChartType("BarChart");
  }

  return (
    <div className="graph">
      <select
        name="graph"
        id=""
        onChange={(e) => {
          setData(e.target.value);
        }}
      >
        <option value={wordsPerMin}>wordsPerMin every game</option>
        <option value={difficultyData}>difficulty level</option>
      </select>
      <Chart
        chartType={chart}
        data={data}
        width="600px"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default Graph;