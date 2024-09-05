import { useEffect } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useCitySearch } from "../../hooks/useCitySearch";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { LayoutPage } from "../../components/LayoutPage";

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
      <div className="relative flex flex-col max-w-[600px] p-6 mx-auto rounded-xl bg-black">
        <div className="flex justify-center items-center gap-3 pt-16 mb-5">
          <input
            type="text"
            className="flex max-w-full w-4/5 h-[78px] bg-[#ebfffc] border-none outline-none rounded-full pl-10 text-[#626262] text-2xl font-normal sm:w-3/4"
            placeholder="Digite uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div
            className="flex justify-center items-center w-[78px] h-[78px] bg-white rounded-full cursor-pointer text-black hover:bg-black hover:text-white transition-colors duration-300"
            onClick={search}
          >
            <Icon name="Search" className="text-2xl" />
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-10">
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
            <div className="text-white text-4xl font-normal flex justify-center mt-5">
              {climaData.location}
            </div>
            <div className="p-4 flex items-center justify-center text-center gap-8">
              <div className="flex justify-center text-white text-4xl">
                {wicon}
              </div>
              <div className="text-white text-4xl font-normal">
                {climaData.temperature !== ""
                  ? climaData.temperature.toString().substring(0, 2)
                  : ""}
                °C
              </div>
            </div>
            <div className="mt-5 text-white flex flex-row justify-center gap-10">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Humidity" className="text-4xl text-white" />
                <div className="text-white text-2xl font-normal">
                  <div className="text-3xl font-normal">
                    {climaData.humidity}%
                  </div>
                  <div className="text-xs font-normal">Humidade</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Windy" className="text-4xl text-white" />
                <div className="text-white text-2xl font-normal">
                  <div className="text-3xl font-normal">
                    {climaData.wind} km/h
                  </div>
                  <div className="text-xs font-normal">Velocidade do vento</div>
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
