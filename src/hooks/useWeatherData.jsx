// Hooks
import { useState } from "react";

const useWeatherData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [climaData, setClimaData] = useState({
        humidity: "",
        wind: "",
        temperature: "",
        location: "",
    });

    const fetchData = async (city) => {
        setIsLoading(true);

        const api_key = "edef938077466df0a6ddd2450d699bc2";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            setClimaData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
            });
        } catch (error) {
            console.error(
                "Erro durante a busca ou atualização do clima:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, climaData, fetchData };
};

export default useWeatherData;
