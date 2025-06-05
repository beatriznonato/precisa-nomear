import { useEffect, useState } from "react";
import {
  mapWrapper,
  tooltip,
  sideLayer,
  tooltipUF,
  ufBlock,
  returnBtn,
  ufName,
  ufBlockCount,
  tooltipUFCount,
  ufDataGrid,
  ufBlockTitle,
  stateData,
  sideLayerAlert,
} from "./Map.css";
import Button from "../Button/Button";
import { getUfName } from "../../hooks/getUfName";
import Chart from "./Chart/Chart";
import MapSVG from "./SVG/MapSVG";
import Alert from "../Alert/Alert";
import { getActiveHelp } from "../../hooks/getActiveHelp";
import { getPercentage } from "../../hooks/getPercentage";
import { fetchUserCountByUF } from "../../hooks/fetchUserCountByUF";

export const Map = () => {
  const [hoveredUF, setHoveredUF] = useState<string | null>(null);
  const [selectedUF, setSelectedUF] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [userCountByUF, setUserCountByUF] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    fetchUserCountByUF().then(setUserCountByUF);
  }, []);

  const handleMouseEnter = (
    uf: string,
    e: React.MouseEvent<SVGPathElement>
  ) => {
    setHoveredUF(uf);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => setHoveredUF(null);
  const handleClick = (uf: string) => setSelectedUF(uf);

  return (
    <div className={mapWrapper}>
      <MapSVG
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleClick={handleClick}
        isSelected={selectedUF}
      />

      {hoveredUF && (
        <div
          className={tooltip}
          style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
        >
          <p className={tooltipUF}>{hoveredUF}</p>
          <div className={tooltipUFCount}>{userCountByUF[hoveredUF] ?? 0}</div>
        </div>
      )}

      <div
        className={sideLayer}
        style={{
          right: selectedUF ? 0 : "-100%",
        }}
      >
        {selectedUF && (
          <>
            <Button
              className={returnBtn}
              variant="transparent"
              icon="arrowLeft"
              onClick={() => setSelectedUF(null)}
            >
              Voltar
            </Button>
            <h2 className={ufName}>{getUfName(selectedUF)}</h2>

            <div className={stateData}>
              <Alert
                className={sideLayerAlert}
                title="Nenhum desastre"
                description="Tudo certo por aqui!"
                icon="check"
              />
              <div className={ufDataGrid}>
                <div className={ufBlock}>
                  <h3 className={ufBlockTitle}>Vulneráveis</h3>
                  <div className={ufBlockCount}>
                    {userCountByUF[selectedUF] ?? 0}
                  </div>
                </div>

                <div className={ufBlock}>
                  <h3 className={ufBlockTitle}>Pedidos de Ajuda</h3>
                  <div className={ufBlockCount}>
                    {getActiveHelp(userCountByUF[selectedUF] ?? 0)}
                  </div>
                </div>
              </div>

              <div className={ufBlock}>
                <h3 className={ufBlockTitle}>
                  Vidas em áreas de risco histórico
                </h3>
                <div className={ufBlockCount}>
                  {getPercentage(userCountByUF[selectedUF] ?? 0)}
                </div>
              </div>

              <div className={ufBlock}>
                <h3 className={ufBlockTitle}>Vulnerabilidades</h3>
                <Chart uf={selectedUF} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Map;
