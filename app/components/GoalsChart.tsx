"use client";

import { Goals } from "../services/data/types/teams/statistics";
import { Grid } from "@visx/grid";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GradientTealBlue } from "@visx/gradient";
import { Group } from "@visx/group";

export function GoalsChart(props: { goals: Goals }) {
  const xMax = Math.max(
    ...Object.keys(props.goals.for.minute).map((x) =>
      Number(x.match(/- \d+/)?.[0] ?? 0)
    )
  );
  const yMax = Math.max(
    ...Object.values(props.goals.for.minute).map((x) => Number(x.total))
  );
  const xScale = scaleBand<number>({
    domain: Object.keys(props.goals.for.minute).map((x) =>
      Number(x.match(/-(\d+)/)?.[1] ?? 0)
    ),
    round: true,
    padding: 0.2,
  });
  const yScale = scaleLinear<number>({
    domain: [0, yMax],
    round: true,
  });
  return (
    <div className="h-32 mb-8">
      <ParentSize>
        {({ width, height }) => {
          return (
            <>
              <svg
                width={width}
                height={height + 60}
                className=" border-slate-800"
              >
                {" "}
                {/** Extra height for the legend */}
                <GradientTealBlue id="teal" />
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
                    ([minute, goals]) => {
                      const barHeight =
                        yMax - (yScale(Number(goals.total ?? 0)) ?? 0);
                      return (
                        <Bar
                          fill={`url(#teal)`}
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
