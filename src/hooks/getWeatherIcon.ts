export type WeatherIcon = {
  clear: string;
  cloudy: string;
  cloudyDay: string;
  cloudyNight: string;
  rain: string;
  thunder: string;
  snow: string;
  mist: string;
  default: string;
};

export function getWeatherIcon(
  description: string,
  iconCode: string,
  icon: WeatherIcon
) {
  const desc = description.toLowerCase();
  const isDay = iconCode.includes("d");

  if (desc.includes("clear")) return icon.clear;

  if (desc.includes("few clouds") || desc.includes("scattered clouds")) {
    return isDay ? icon.cloudyDay : icon.cloudyNight;
  }

  if (desc.includes("broken clouds") || desc.includes("overcast clouds")) {
    return icon.cloudy;
  }

  if (desc.includes("rain") || desc.includes("drizzle")) {
    return icon.rain;
  }

  if (desc.includes("thunder")) {
    return icon.thunder;
  }

  if (desc.includes("snow")) {
    return icon.snow;
  }

  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) {
    return icon.mist;
  }

  return icon.default;
}
