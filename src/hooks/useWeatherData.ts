import { useState } from "react";
import { WeatherData, WeatherHook } from "./types";

export const useWeatherData = (): WeatherHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [iconCode, setIconCode] = useState<string>("01d");
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

      setIconCode(data.weather[0].icon);

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

  return { isLoading, climaData, fetchData, iconCode };
};
