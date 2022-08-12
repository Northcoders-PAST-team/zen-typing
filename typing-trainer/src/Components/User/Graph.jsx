import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const Graph = ({ exercisesData }) => {
  let happy = 0;
  let neutral = 0;
  let sad = 0;
  let surprised = 0;
  let disgusted = 0;
  let easy = 0;
  let medium = 0;
  let hard = 0;

  exercisesData.forEach((exercise, index) => {
    happy += exercise.happy;
    neutral += exercise.neutral;
    sad += exercise.sad;
    surprised += exercise.surprised;
    disgusted += exercise.disgusted;
    exercise.difficulty === "easy"
      ? (easy += 1)
      : exercise.difficulty === "medium"
      ? (medium += 1)
      : (hard += 1);
  });

  const emotions = JSON.stringify([
    ["Emotion", "Percentage"],
    ["happy", happy / exercisesData.length],
    ["neutral", neutral / exercisesData.length],
    ["sad", sad / exercisesData.length],
    ["surprised", surprised / exercisesData.length],
    ["disgusted", disgusted / exercisesData.length],
  ]);

  const difficultyData = JSON.stringify([
    ["Difficulty", "Count"],
    ["easy", easy],
    ["medium", medium],
    ["hard", hard],
  ]);

  const test = [];

  let count = 1;
  const seperateWPM = exercisesData.map((item) => {
    return [count++, parseInt(item.wpm)];
  });
  const wordsPerMin = JSON.stringify([["Exercise", "W/M"], ...seperateWPM]);

  //state for data going in
  const [data, setData] = useState(wordsPerMin);
  const [chart, setChartType] = useState("Line");
  const [title, setTitle] = useState("");
  const options = {
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    is3d: true,
    title: title,
  };

  console.log(options);

  return (
    <div className="graph">
      <select
        name="graph"
        id=""
        onChange={(e) => {
          setData(e.target.value);
          if (e.target.value === wordsPerMin) {
            setChartType("Line");
            setTitle("words per min per exercise");
          } else if (e.target.value === difficultyData) {
            setChartType("Bar");
            setTitle("Difficulty chosen");
          } else if (e.target.value === emotions) {
            setChartType("PieChart");
            setTitle("Emotions");
          }
        }}
      >
        <option value={wordsPerMin} id="Line">
          wordsPerMin every game
        </option>
        <option value={difficultyData} id="Bar">
          difficulty level
        </option>
        <option value={emotions} id="PieChart">
          Total emotion %
        </option>
      </select>

      {data.length === 1 ? (
        <h2>pick a chart</h2>
      ) : (
        <Chart
          className=""
          chartType={chart}
          data={JSON.parse(data)}
          width="600px"
          height="400px"
          legendToggle
          options={{
            animation: {
              startup: true,
              easing: "linear",
              duration: 1500,
            },
            is3d: true,
            title: title,
          }}
        />
      )}
    </div>
  );
};

export default Graph;
