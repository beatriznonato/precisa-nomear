import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { db } from "../../../firebase/FirebaseConfig";
import {
  activeDataDesc,
  activeDataTitle,
  activeDataWrapper,
  chartContainer,
  chartLegend,
  chartWrapper,
  legenColorElm,
  legendContainer,
  legendDesc,
} from "./Chart.css";
import { themeVars } from "../../../theme.css";
import { getUfName } from "../../../hooks/getUfName";

type ChartProps = {
  uf: string;
};

const COLORS = [
  themeVars.color.graph.level1,
  themeVars.color.graph.level2,
  themeVars.color.graph.level3,
  themeVars.color.graph.level4,
  themeVars.color.graph.level5,
];

const DISABILITY_LABELS: Record<string, string> = {
  fisica: "Cadeirantes",
  visual: "Def. visual",
  auditiva: "Def. auditiva",
  cognitiva: "Cognitiva",
  cronica: "Crônicas",
};

const Chart = ({ uf }: ChartProps) => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const counts: Record<string, number> = {};

      snapshot.forEach((doc) => {
        const user = doc.data();
        const userUF = user?.address?.state?.toUpperCase();
        const disability = user?.disability;

        if (
          user?.cpf &&
          userUF === uf &&
          disability &&
          DISABILITY_LABELS[disability]
        ) {
          counts[disability] = (counts[disability] ?? 0) + 1;
        }
      });

      const chartData = Object.entries(counts).map(([key, value]) => ({
        name: DISABILITY_LABELS[key],
        value,
      }));

      setData(chartData);
    };

    fetchData();
  }, [uf]);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const activeData = activeIndex !== null ? data[activeIndex] : null;

  if (data.length === 0) {
    return <p>Nenhum dado disponível para {getUfName(uf)}</p>;
  }

  return (
    <div className={chartContainer}>
      <div className={chartWrapper}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_entry, index) => (
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
              <p className={activeDataTitle}>{activeData.value}</p>
              <p className={activeDataDesc}>{activeData.name}</p>
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
            <p className={legendDesc}>{entry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
