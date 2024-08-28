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
    const [wicon, setWicon] = useState<ReactElement>(<Icon name="CloudSun" />);
    const weatherIconMap: WeatherIconMap = {
        "01d": <Icon name="Sun" />,
        "01n": <Icon name="Sun" />,
        "02d": <Icon name="Cloud" />,
        "02n": <Icon name="Cloud" />,
        "03d": <Icon name="Drizzle" />,
        "03n": <Icon name="Drizzle" />,
        "04d": <Icon name="Drizzle" />,
        "04n": <Icon name="Drizzle" />,
        "09d": <Icon name="Rain" />,
        "09n": <Icon name="Rain" />,
        "10d": <Icon name="Rain" />,
        "10n": <Icon name="Rain" />,
        "13d": <Icon name="Snow" />,
        "13n": <Icon name="Snow" />,
    };
    const defaultIcon: ReactElement = <Icon name="Sun" />;
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
