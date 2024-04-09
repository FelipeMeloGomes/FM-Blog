// Hooks
import { useState } from "react";

// Components
import { Icon } from "../components/IconComponent";

const useWeatherData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [wicon, setWicon] = useState(<Icon name="cloud-sun" />);
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

            switch (data.weather[0].icon) {
                case "01d":
                case "01n":
                    setWicon(<Icon name="sun" />);
                    break;
                case "02d":
                case "02n":
                    setWicon(<Icon name="cloud" />);
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    setWicon(<Icon name="drizzle" />);
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    setWicon(<Icon name="rain" />);
                    break;
                case "13d":
                case "13n":
                    setWicon(<Icon name="snow" />);
                    break;
                default:
                    setWicon(<Icon name="sun" />);
            }

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

    return { isLoading, climaData, fetchData, wicon, Icon };
};

export default useWeatherData;
