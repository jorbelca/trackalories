import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLegend,
} from "victory";

const Chart = ({ data }) => {
  data = data.filter(
    (d) =>
      d.weight !== null &&
      d.date != null &&
      !isNaN(d.weight) &&
      typeof d.date === "string" &&
      d.weight !== Infinity &&
      d.date !== Infinity
  );
  let medianData = [];
  for (let index = 0; index < data.length; index++) {
    const { date, weight } = data[index];
    if (index > 0) {
      let sumWeights = 0;
      for (let counter = 0; counter <= index; counter++) {
        const { weight } = data[counter];
        if (weight !== "NaN") sumWeights += weight;
      }
      const calculatedMedia = sumWeights / (index + 1);
      medianData[index] = {
        date: date,
        median: Number(calculatedMedia.toFixed(3)),
      };
    } else {
      medianData[index] = { date: date, median: weight };
    }
  }
  return (
    <div className="chart">
      <VictoryChart
        width={1000}
        height={500}
        padding={100}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryLegend
          x={380}
          y={0}
          title="Leyenda"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
          data={[
            { name: "Peso Registrado", symbol: { fill: "#c43a31" } },
            { name: "Tendencia", symbol: { fill: "green" } },
          ]}
        />

        <VictoryLine
          style={{
            data: { stroke: "#c43a31", strokeWidth: 3 },
            parent: { border: "1px solid #ccc" },
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
            tickLabels: { fontSize: 20 },
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              angle: 45,
              transform: "translate(55, 35)",
              fontSize: 20,
            },
          }}
          tickCount={10}
        />

        <VictoryGroup
          labels={({ datum }) => `Media  ${datum.median} kg`}
          labelComponent={<VictoryTooltip />}
        >
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: "green", strokeWidth: 1 },
              parent: { border: "1px solid #ccc" },
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 1000 },
            }}
            data={medianData}
            y="median"
            x="date"
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default Chart;
