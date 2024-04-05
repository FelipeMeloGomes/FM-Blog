// Hooks
import { useState, useEffect } from "react";
import useWeatherData from "../../hooks/useWeatherData";

// Components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";
import Spinner from "../../components/Spinner/Spinner";
import LayoutPage from "./../../components/LayoutPage/LayoutPage";

// Estilos Css
import styles from "./Weather.module.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { WiHumidity, WiWindy } from "react-icons/wi";
import { FaCloudSun } from "react-icons/fa";

const Weather = () => {
    const [city, setCity] = useState("");
    const [wicon, setWicon] = useState(<FaCloudSun />);
    const { isLoading, climaData, fetchData } = useWeatherData();
    const [showDetails, setShowDetails] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    const search = async () => {
        if (city === "") {
            return;
        }
        fetchData(city);
        setShowDetails(true);
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
                        <div className={styles.weather_image}>{wicon}</div>

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
                                <WiHumidity className={styles.icon_font} />
                                <div className={styles.data}>
                                    <div className={styles.humidity_percent}>
                                        {climaData.humidity}%
                                    </div>
                                    <div className={styles.text}>Humidade</div>
                                </div>
                            </div>

                            <div className={styles.element}>
                                <WiWindy className={styles.icon_font} />
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
