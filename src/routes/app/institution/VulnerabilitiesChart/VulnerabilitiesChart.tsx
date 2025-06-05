import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxis as RawXAxis,
  TooltipProps,
} from "recharts";
import { themeVars } from "../../../../theme.css";
import { barChart, responsiveContainer } from "./VulnerabilitiesChart.css";

type BarDataItem = {
  name: string;
  value: number;
};

const COLORS = [
  themeVars.color.graph.level1,
  themeVars.color.graph.level2,
  themeVars.color.graph.level3,
  themeVars.color.graph.level4,
  themeVars.color.graph.level5,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const XAxis = RawXAxis as unknown as React.FC<any>;

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: themeVars.color.black,
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        color: "white",
        fontSize: "14px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ margin: 0, color: "white" }}>{payload[0].value}</p>
    </div>
  );
};

export const VulnerabilitiesChart = ({ data }: { data: BarDataItem[] }) => {
  const filteredData = data
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer
      className={responsiveContainer}
      width={"100%"}
      height={300}
    >
      <BarChart className={barChart} data={filteredData}>
        <XAxis dataKey="name" />
        <Tooltip
          cursor={{
            fill: "white",
          }}
          content={<CustomTooltip />}
        />
        <Bar dataKey="value" barSize={40} isAnimationActive={false}>
          {filteredData.map((_entry, index) => (
            <Cell
              radius={7}
              width={45}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
