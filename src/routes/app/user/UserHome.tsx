import { getWeatherIcon } from "../../../hooks/getWeatherIcon";
import { useWeather } from "../../../hooks/useWeather";
import Navigation, { Tab } from "../../../components/Navigation/Navigation";
import ClearDay from "../../../assets/images/clear_day.png";
import ClearNight from "../../../assets/images/clear_night.png";
import Cloudy from "../../../assets/images/cloudy.png";
import CloudyDay from "../../../assets/images/day_cloudy.png";
import CloudyNight from "../../../assets/images/night_cloudy.png";
import Rain from "../../../assets/images/rainy.png";
import Thunder from "../../../assets/images/thunderstorm.png";
import Snow from "../../../assets/images/snowy.png";
import Mist from "../../../assets/images/windy.png";
import Default from "../../../assets/images/clear_day.png";
import { WeatherIcon } from "../../../hooks/getWeatherIcon";
import Icon from "../../../components/Icon/Icon";
import {
  container,
  header,
  weatherIcon,
  temperature,
  userLocation,
  weatherDetails,
  separator,
  alertContainer,
  alertHeader,
  alertTitle,
  alertIcon,
  alertValidation,
  userNav,
  upperNav,
  profilePhoto,
  settingsIcon,
  headerTextWrapper,
  contentWrapper,
  weatherItem,
  alignCenter,
  alertContent,
  alertPlaceholder,
} from "./UserHome.css";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useAuth } from "../../../firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import FailureScreen from "../../../components/FailureScreen/FailureScreen";

const weatherIcons: WeatherIcon = {
  clearDay: ClearDay,
  clearNight: ClearNight,
  cloudy: Cloudy,
  cloudyDay: CloudyDay,
  cloudyNight: CloudyNight,
  rain: Rain,
  thunder: Thunder,
  snow: Snow,
  mist: Mist,
  default: Default,
};

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];

export const UserHome = () => {
  const { weather, loading } = useWeather();
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (!user) {
          setUserName("Usuário");
          return;
        }
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const fullName = userData.name || "";
          const firstName = fullName.split(" ")[0];
          setUserName(firstName);
        } else {
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName("Usuário");
      }
    }

    fetchUserName();
  }, [user]);

  if (loading)
    return (
      <div className={container}>
        <Navigation tabs={NavTabs} className={userNav} />
        <div className={contentWrapper}>
          <header className={header}>
            <div className={headerTextWrapper}>
              <h3>Olá, {userName}!</h3>
              <p>Tudo certo por aí?</p>
            </div>
            <nav className={upperNav}>
              <Icon
                className={settingsIcon}
                type="settings"
                onClick={() => navigate("/configuracoes")}
              />
              <div className={profilePhoto}></div>
            </nav>
          </header>
          <LoadingScreen />
        </div>
      </div>
    );

  if (!weather)
    return (
      <div className={container}>
        <Navigation tabs={NavTabs} className={userNav} />
        <div className={contentWrapper}>
          <header className={header}>
            <div className={headerTextWrapper}>
              <h3>Olá, {userName}!</h3>
              <p>Tudo certo por aí?</p>
            </div>
            <nav className={upperNav}>
              <Icon
                className={settingsIcon}
                type="settings"
                onClick={() => navigate("/configuracoes")}
              />
              <div className={profilePhoto}></div>
            </nav>
          </header>
          <FailureScreen text="Não foi possível obter os dados." />
        </div>
      </div>
    );

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
      <Navigation tabs={NavTabs} className={userNav} />
      <div className={contentWrapper}>
        <header className={header}>
          <div className={headerTextWrapper}>
            <h3>Olá, {userName}!</h3>
            <p>Tudo certo por aí?</p>
          </div>
          <nav className={upperNav}>
            <Icon
              className={settingsIcon}
              type="settings"
              onClick={() => navigate("/configuracoes")}
            />
            <div className={profilePhoto}></div>
          </nav>
        </header>
        <div className={alignCenter}>
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
          <p className={userLocation}>{weather.location.name}</p>
        </div>
        <div className={weatherDetails}>
          <div className={weatherItem}>
            <h4>Vento</h4>
            <p>{weather.wind_kph} km/h</p>
          </div>

          <div className={separator}></div>

          <div className={weatherItem}>
            <h4>Umidade</h4>
            <p>{weather.humidity}%</p>
          </div>
        </div>
        {weather.alerts?.alert?.length > 0 ? (
          <div className={alertContainer}>
            <div className={alertHeader}>
              <Icon type="alert" className={alertIcon} />
              <h3 className={alertTitle}>{weather.alerts.alert[0].headline}</h3>
            </div>
            <p className={alertContent}>{weather.alerts.alert[0].desc}</p>
            <p className={alertValidation}>
              Válido até:{" "}
              {new Date(weather.alerts.alert[0].expires).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className={alertPlaceholder}></div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
