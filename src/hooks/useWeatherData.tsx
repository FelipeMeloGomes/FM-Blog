import { useState, ReactElement } from "react";

// Components
import { Icon } from "../components/IconComponent";

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
    Icon: typeof Icon;
}

export const useWeatherData = (): WeatherHook => {
    const [isLoading, setIsLoading] = useState(false);
    const [wicon, setWicon] = useState<ReactElement>(<Icon name="cloud-sun" />);
    const weatherIconMap: WeatherIconMap = {
        "01d": <Icon name="sun" />,
        "01n": <Icon name="sun" />,
        "02d": <Icon name="cloud" />,
        "02n": <Icon name="cloud" />,
        "03d": <Icon name="drizzle" />,
        "03n": <Icon name="drizzle" />,
        "04d": <Icon name="drizzle" />,
        "04n": <Icon name="drizzle" />,
        "09d": <Icon name="rain" />,
        "09n": <Icon name="rain" />,
        "10d": <Icon name="rain" />,
        "10n": <Icon name="rain" />,
        "13d": <Icon name="snow" />,
        "13n": <Icon name="snow" />,
    };
    const defaultIcon: ReactElement = <Icon name="sun" />;
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
