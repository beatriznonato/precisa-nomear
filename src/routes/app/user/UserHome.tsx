import { useWeather } from "../../../hooks/useWeather";

export const UserHome = () => {
  const { weather, loading } = useWeather();

  if (loading) return <p>Carregando clima...</p>;
  if (!weather) return <p>Não foi possível obter os dados.</p>;

  //mock de alerta
  // weather.alerts = {
  //   alert: [
  //     {
  //       headline: "Alerta de Tempestade",
  //       desc: "Risco de tempestade severa com ventos fortes e queda de granizo nas próximas horas.",
  //       event: "Tempestade Severas",
  //       effective: "2025-06-02T14:00:00Z",
  //       expires: "2025-06-02T20:00:00Z",
  //     },
  //   ],
  // };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>
        {weather.temp_c}°C – {weather.location.name}, {weather.location.region}
      </h2>
      <p>🌬️ Vento: {weather.wind_kph} km/h</p>
      <p>💧 Umidade: {weather.humidity}%</p>
      <img
        src={`https:${weather.condition.icon}`}
        alt={weather.condition.text}
      />

      {weather.alerts?.alert?.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid purple",
            borderRadius: "8px",
          }}
        >
          <strong>⚠️ {weather.alerts.alert[0].event}</strong>
          <p>{weather.alerts.alert[0].desc}</p>
          <small>
            Válido até:{" "}
            {new Date(weather.alerts.alert[0].expires).toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
};

export default UserHome;
