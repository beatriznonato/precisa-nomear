import { getWeatherIcon } from "../../../hooks/getWeatherIcon";
import { useWeather } from "../../../hooks/useWeather";
import Clear from "../../../assets/images/sunny.png";
import Cloudy from "../../../assets/images/cloudy.png";
import CloudyDay from "../../../assets/images/day_cloudy.png";
import CloudyNight from "../../../assets/images/night_cloudy.png";
import Rain from "../../../assets/images/rainy.png";
import Thunder from "../../../assets/images/thunderstorm.png";
import Snow from "../../../assets/images/snowy.png";
import Mist from "../../../assets/images/windy.png";
import Default from "../../../assets/images/sunny.png";
import { WeatherIcon } from "../../../hooks/getWeatherIcon";
import Icon from "../../../components/Icon/Icon";
import {
  container,
  header,
  weatherIcon,
  temperature,
  userLocation,
  weatherDetails,
  wind,
  separator,
  humidity,
  alertContainer,
  alertHeader,
  alertTitle,
  alertIcon,
  alertValidation,
} from "./UserHome.css";

const weatherIcons: WeatherIcon = {
  clear: Clear,
  cloudy: Cloudy,
  cloudyDay: CloudyDay,
  cloudyNight: CloudyNight,
  rain: Rain,
  thunder: Thunder,
  snow: Snow,
  mist: Mist,
  default: Default,
};

export const UserHome = () => {
  const { weather, loading } = useWeather();
  const userName = "GetFromFirebase";

  if (loading) return <p>Carregando clima...</p>;
  if (!weather) return <p>Não foi possível obter os dados.</p>;

  // mock de alerta
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
    <div className={container}>
      <header className={header}>
        <h3>Olá, {userName}</h3>
        <p>Tudo certo por aí?</p>
        <nav>
          <Icon type="settings" />
          {/* profile image */}
        </nav>
      </header>

      <img
        src={getWeatherIcon(
          weather.condition.text,
          weather.iconCode,
          weatherIcons
        )}
        alt={weather.condition.text}
        className={weatherIcon}
      />
      <h2 className={temperature}>{weather.temp_c}°C</h2>
      <p className={userLocation}>
        {weather.location.name} - {weather.location.region}
      </p>

      <div className={weatherDetails}>
        <div className={wind}>
          <h4>Vento</h4>
          <p>{weather.wind_kph} km/h</p>
        </div>

        <div className={separator}></div>

        <div className={humidity}>
          <h4>Umidade</h4>
          <p>{weather.humidity}%</p>
        </div>
      </div>

      {weather.alerts?.alert?.length > 0 && (
        <div className={alertContainer}>
          <div className={alertHeader}>
            <Icon type="alert" className={alertIcon} />
            <h3 className={alertTitle}>{weather.alerts.alert[0].event}</h3>
          </div>
          <p>{weather.alerts.alert[0].desc}</p>
          <p className={alertValidation}>
            Válido até:{" "}
            {new Date(weather.alerts.alert[0].expires).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserHome;
