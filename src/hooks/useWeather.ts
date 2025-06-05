import { useEffect, useState } from "react";

type WeatherData = {
  temp_c: number;
  humidity: number;
  wind_kph: number;
  iconCode: string;
  condition: { icon: string; text: string };
  location: { name: string; region: string };
  alerts: {
    alert: {
      sender_name: string;
      event: string;
      start: number;
      end: number;
      description: string;
      tags: string[];
    }[];
  };
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Chamada 1: pegar nome da cidade e dados principais
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();

      // Chamada 2: pegar alertas com o One Call API
      const alertsRes = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      const alertsData = await alertsRes.json();

      setWeather({
        temp_c: Math.round(weatherData.main.temp),
        humidity: Math.round(weatherData.main.humidity),
        wind_kph: Math.round(weatherData.wind.speed * 3.6),
        iconCode: weatherData.weather[0].icon,
        condition: {
          icon: "",

          text: weatherData.weather[0].description,
        },
        location: {
          name: weatherData.name,
          region: "",
        },
        alerts: {
          alert: alertsData.alerts ?? [],
        },
      });

      setLoading(false);
    });
  }, [apiKey]);

  return { weather, loading };
}
