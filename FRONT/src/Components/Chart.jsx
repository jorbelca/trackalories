import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

const Chart = ({ data }) => {
  return (
    <div className="chart">
      <VictoryChart width={1800} height={800} padding={120}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31", strokeWidth: 5 },
            parent: { border: "2px solid #ccc" },
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
          data={data}
          y="weight"
          x="date"
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 30 },
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              angle: 45,
              transform: "translate(55, 35)",
              fontSize: 30,
            },
          }}
          tickCount={10}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
