// Hooks
import { useState, useEffect } from "react";

// Axios
import Axios from "axios";

// Components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";
import Spinner from "../../components/Spinner/Spinner";
import LayoutPage from "./../../components/LayoutPage/LayoutPage";

// Estilos Css
import styles from "./Weather.module.css";

// Icons
import { CiSearch } from "react-icons/ci";
import cloud_icon from "./assets/cloud.webp";
import wind_icon from "./assets/wind.webp";
import snow_icon from "./assets/snow.webp";
import rain_icon from "./assets/rain.webp";
import drizzle_icon from "./assets/drizzle.webp";
import clear_icon from "./assets/clear.webp";
import humidity_icon from "./assets/humidity.webp";

const Weather = () => {
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [wicon, setWicon] = useState(cloud_icon);
    const [showDetails, setShowDetails] = useState(false);
    const [climaData, setClimaData] = useState({
        humidity: "",
        wind: "",
        temperature: "",
        location: "",
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    const api_key = "edef938077466df0a6ddd2450d699bc2";

    const search = async () => {
        if (city === "") {
            return;
        }

        setIsLoading(true);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        try {
            let response = await Axios.get(url);

            let data = response.data;

            setClimaData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
            });

            setWeatherIcon(data.weather[0].icon);
            setShowDetails(true);
        } catch (error) {
            console.error(
                "Erro durante a busca ou atualização do clima:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const setWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                setWicon(clear_icon);
                break;
            case "02d":
            case "02n":
                setWicon(cloud_icon);
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                setWicon(drizzle_icon);
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                setWicon(rain_icon);
                break;
            case "13d":
            case "13n":
                setWicon(snow_icon);
                break;
            default:
                setWicon(cloud_icon);
                break;
        }
    };

    useEffect(() => {
        search();
    }, []);

    return (
        <LayoutPage height="auto">
            <>
                <TitleParagraph title="Confira o clima de sua cidade!" />
            </>
            <div className={styles.container}>
                <div className={styles.top_bar}>
                    <input
                        type="text"
                        className={styles.city_input}
                        placeholder="Digite uma cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={styles.search_icon} onClick={search}>
                        <CiSearch className="icon_font" />
                    </div>
                </div>

                {isLoading && (
                    <div className={styles.loading}>
                        <Spinner
                            height="100px"
                            startColor="white"
                            middleColor="white"
                            endColor="white"
                        />
                    </div>
                )}

                {showDetails && !isLoading && (
                    <>
                        <div className={styles.weather_image}>
                            <img src={wicon} alt="weather icon" />
                        </div>

                        <div className={styles.weather_temp}>
                            {climaData.temperature !== ""
                                ? climaData.temperature
                                      .toString()
                                      .substring(0, 2)
                                : ""}
                            °C
                        </div>
                        <div className={styles.weather_location}>
                            {climaData.location}
                        </div>
                        <div className={styles.data_container}>
                            <div className={styles.element}>
                                <img
                                    src={humidity_icon}
                                    alt="humidity icon"
                                    className={styles.icon}
                                />
                                <div className={styles.data}>
                                    <div className={styles.humidity_percent}>
                                        {climaData.humidity}%
                                    </div>
                                    <div className={styles.text}>Humidade</div>
                                </div>
                            </div>

                            <div className={styles.element}>
                                <img
                                    src={wind_icon}
                                    alt="wind icon"
                                    className={styles.icon}
                                />
                                <div className={styles.data}>
                                    <div className={styles.wind_rate}>
                                        {climaData.wind} km/h
                                    </div>
                                    <div className={styles.text}>
                                        Velocidade do vento
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </LayoutPage>
    );
};

export default Weather;
