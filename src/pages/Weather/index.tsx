// Hooks
import { useEffect } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useCitySearch } from "../../hooks/useCitySearch";

// Components
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { LayoutPage } from "../../components/LayoutPage";

// Estilos Css
import styles from "./Weather.module.css";

const Weather = () => {
    const { isLoading, climaData, fetchData, wicon, Icon } = useWeatherData();
    const { city, setCity, showDetails, handleKeyDown, search } =
        useCitySearch(fetchData);

    useEffect(() => {
        search();
    }, []);

    return (
        <LayoutPage height="auto">
            <>
                <TextField title="Confira o clima de sua cidade!" />
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
                        <Icon name="search" className="icon_font" />
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
                        <div className={styles.weather_location}>
                            {climaData.location}
                        </div>
                        <div className={styles.weather_container}>
                            <div className={styles.weather_image}>{wicon}</div>

                            <div className={styles.weather_temp}>
                                {climaData.temperature !== ""
                                    ? climaData.temperature
                                          .toString()
                                          .substring(0, 2)
                                    : ""}
                                °C
                            </div>
                        </div>
                        <div className={styles.data_container}>
                            <div className={styles.element}>
                                <Icon
                                    name="humidity"
                                    className={styles.icon_font}
                                />
                                <div className={styles.data}>
                                    <div className={styles.humidity_percent}>
                                        {climaData.humidity}%
                                    </div>
                                    <div className={styles.text}>Humidade</div>
                                </div>
                            </div>

                            <div className={styles.element}>
                                <Icon
                                    name="windy"
                                    className={styles.icon_font}
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

export { Weather };
