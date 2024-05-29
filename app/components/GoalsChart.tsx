"use client";

import { Goals } from "../services/data/types/teams/statistics";
import { Grid } from "@visx/grid";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GradientDarkgreenGreen, LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";

export function GoalsChart(props: {
  goals: Goals;
  focus: "for" | "against" | "difference";
}) {
  const goalsFor = Object.values(props.goals.for.minute).map((x) =>
    Number(x.total)
  );
  const goalsAgainst = Object.values(props.goals.against.minute).map((x) =>
    Number(x.total)
  );
  const collectedGoals: number[] =
    props.focus === "difference"
      ? goalsFor.map((x, idx) => x - (goalsAgainst[idx] ?? 0))
      : props.focus === "against"
      ? goalsAgainst
      : goalsFor;
  console.log(props.focus, collectedGoals);
  const yMax = Math.max(...collectedGoals);
  const yMin = Math.min(...collectedGoals);
  const xScale = scaleBand<number>({
    domain: Object.keys(props.goals.for.minute).map((x) =>
      Number(x.match(/-(\d+)/)?.[1] ?? 0)
    ),
    round: true,
    padding: 0.1,
  });
  const yScale = scaleLinear<number>({
    domain: [yMin, yMax],
    round: true,
  });
  return (
    <div className="h-32 mb-8 max-w-[32rem] pb-8">
      <h3 className="font-semibold text-center text-slate-800">
        {((focus) => {
          switch (focus) {
            case "for":
              return "Goals For";
            case "against":
              return "Goals Against";
            case "difference":
              return "Goal Difference";
          }
        })(props.focus)}
      </h3>
      <ParentSize>
        {({ width, height }) => {
          return (
            <>
              <svg
                width={width}
                height={height + 60}
                className=" border-slate-800"
              >
                <GradientDarkgreenGreen id="gradient" amplitude={20} />
                <Group left={60} top={10}>
                  <AxisLeft
                    scale={yScale}
                    label="Goals"
                    numTicks={yScale.domain()[1]}
                    rangePadding={0.8}
                    tickFormat={(value) => `${value}`}
                  />
                  <AxisBottom
                    scale={xScale}
                    top={height}
                    label="Minute"
                    tickFormat={(_value, index) =>
                      Object.keys(props.goals.for.minute)[index]
                    }
                  />
                  <Grid
                    height={height}
                    width={width}
                    xScale={xScale.rangeRound([0, width - 50])}
                    yScale={yScale.rangeRound([height, 0])}
                    stroke="RGBA(0,0,0,0.1)"
                  />
                  {Object.entries(props.goals.for.minute).map(
                    ([minute, goals], idx) => {
                      const barHeight =
                        yMax - (yScale(Number(collectedGoals[idx] ?? 0)) ?? 0);
                      return (
                        <Bar
                          fill={`url(#gradient)`}
                          key={minute}
                          x={xScale(Number(minute.match(/-(\d+)/)?.[1] ?? 0))}
                          y={yMax - barHeight}
                          width={xScale.bandwidth()}
                          height={height - yMax + barHeight}
                        />
                      );
                    }
                  )}
                </Group>
              </svg>
            </>
          );
        }}
      </ParentSize>
    </div>
  );
}
