import { useState, ReactElement } from "react";
import { SunIcon } from "@chakra-ui/icons";
import { BiCloud, BiCloudDrizzle } from "react-icons/bi";
import { WiRain, WiSnow } from "react-icons/wi";

interface WeatherData {
  humidity: string;
  wind: string;
  temperature: string;
  location: string;
}
interface WeatherIconMap {
  [key: string]: ReactElement;
}
interface WeatherHook {
  isLoading: boolean;
  climaData: WeatherData;
  fetchData: (city: string) => Promise<void>;
  wicon: ReactElement;
}

export const useWeatherData = (): WeatherHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [wicon, setWicon] = useState<ReactElement>(<SunIcon boxSize={30} />);

  const weatherIconMap: WeatherIconMap = {
    "01d": <SunIcon boxSize={30} />,
    "01n": <SunIcon boxSize={30} />,
    "02d": <BiCloud size={30} />,
    "02n": <BiCloud size={30} />,
    "03d": <BiCloudDrizzle size={30} />,
    "03n": <BiCloudDrizzle size={30} />,
    "04d": <BiCloudDrizzle size={30} />,
    "04n": <BiCloudDrizzle size={30} />,
    "09d": <WiRain size={30} />,
    "09n": <WiRain size={30} />,
    "10d": <WiRain size={30} />,
    "10n": <WiRain size={30} />,
    "13d": <WiSnow size={30} />,
    "13n": <WiSnow size={30} />,
  };

  const defaultIcon: ReactElement = <SunIcon boxSize={30} />;
  const [climaData, setClimaData] = useState<WeatherData>({
    humidity: "",
    wind: "",
    temperature: "",
    location: "",
  });

  const fetchData = async (city: string): Promise<void> => {
    setIsLoading(true);

    const apiKey = "edef938077466df0a6ddd2450d699bc2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const iconCode = data.weather[0].icon;
      const iconComponent = weatherIconMap[iconCode] || defaultIcon;
      setWicon(iconComponent);

      setClimaData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
      });
    } catch (error) {
      console.error("Erro durante a busca ou atualização do clima:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, climaData, fetchData, wicon };
};
