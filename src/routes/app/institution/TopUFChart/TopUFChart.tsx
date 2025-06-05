import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { themeVars } from "../../../../theme.css";
import { useUsersByUF } from "../../../../hooks/useTotalUsersByUF";
import { getUfName } from "../../../../hooks/getUfName";
import {
  chartWrapper,
  activeDataWrapper,
  activeDataTitle,
  activeDataDesc,
  legendContainer,
  legenColorElm,
  legendDesc,
} from "../../../../components/Map/Chart/Chart.css";
import { chartContainer, chartLegend } from "./TopUFChart.css";

const COLORS = [
  themeVars.color.graph.level1,
  themeVars.color.graph.level2,
  themeVars.color.graph.level3,
  themeVars.color.graph.level4,
  themeVars.color.graph.level5,
];

const TopUFChart = () => {
  const usersByUF = useUsersByUF();
  const data = [...usersByUF].sort((a, b) => b.total - a.total).slice(0, 5);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((sum, entry) => sum + entry.total, 0);
  const activeData = activeIndex !== null ? data[activeIndex] : null;

  if (data.length === 0) {
    return <p style={{ fontSize: 14 }}>Nenhum dado disponível no momento.</p>;
  }

  const sortedData = [...usersByUF]
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className={chartContainer}>
      <div className={chartWrapper}>
        <PieChart width={200} height={200}>
          <Pie
            data={sortedData}
            innerRadius={70}
            outerRadius={100}
            dataKey="total"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {sortedData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className={activeDataWrapper}>
          {activeData ? (
            <>
              <p className={activeDataTitle}>{activeData.total}</p>
              <p className={activeDataDesc}>{getUfName(activeData.uf)}</p>
            </>
          ) : (
            <>
              <p className={activeDataTitle}>{total}</p>
              <p className={activeDataDesc}>Total</p>
            </>
          )}
        </div>
      </div>

      <div className={chartLegend}>
        {data.map((entry, index) => (
          <div className={legendContainer} key={`legend-${index}`}>
            <div
              className={legenColorElm}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <p className={legendDesc}>{getUfName(entry.uf)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUFChart;
