import { React, useEffect, useState } from "react";
import "./styles/App.css";
import { doFetch } from "./api/fetch";

function App() {
  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [weatherMatrix, setWeatherMatrix] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const weatherData = await doFetch(`data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric`, "GET");
        setWeatherData(weatherData);

        const weatherMatrix = [];
        for (let i = 0; i < 6; i++) {
          const date = new Date();

          // add a day
          date.setDate(date.getDate() + i);

          weatherMatrix.push(weatherData?.list.filter((li) => li.dt_txt.split(" ")[0] === date.toLocaleDateString("en-CA")));
        }
        setWeatherMatrix(weatherMatrix);
        console.log(weatherMatrix);
      } catch (error) {
        console.error(error);
      }
    }
    if (data) getData();
  }, [data]);

  const search = async () => {
    try {
      const cityData = await doFetch(`geo/1.0/direct?q=${searchValue}`, "GET");
      setData(cityData);
      setSearchValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-950 to-purple-400">
      <div className="container mx-auto py-8 px-8 md:px-32 lg:px-64">
        {/* ricerca */}
        <div className="flex justify-between rounded-xl backdrop-blur-lg bg-white/50 text-white py-2 px-4 border-2">
          <input
            type="text"
            placeholder="Cerca una località"
            className="rounded-xl bg-transparent placeholder:text-white outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="rounded-xl" onClick={search}>
            Cerca
          </button>
        </div>

        {/* risultati meteo corrente */}
        <div className="my-8">
          {console.log(weatherData)}
          <div className="rounded-xl backdrop-blur-lg bg-white/40 text-white py-4 md:px-2 border-2">
            <div className="divide-y divide-white px-5">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center pb-4">
                <p className="font-bold text-xl text-center md:text-left">
                  {weatherData?.city.name}, {weatherData?.city.country}
                </p>
                <div className="grid grid-cols-2 items-center text-center md:text-left">
                  <p className="font-semibold text-5xl">{Math.ceil(weatherData?.list[0].main.temp)}°</p>
                  <img src={`https://openweathermap.org/img/wn/${weatherData?.list[0].weather[0].icon}@4x.png`} alt="" />
                </div>
                {/* <p className="font-bold text-xl text-center md:text-left">{weatherData?.list[0].weather[0].main}, {weatherData?.list[0].weather[0].description}</p> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                <p className="font-semibold text-xl text-center md:text-left">Minima: {Math.ceil(weatherData?.list[0].main.temp_min)}°</p>
                <p className="font-semibold text-xl text-center md:text-left">Massima: {Math.ceil(weatherData?.list[0].main.temp_max)}°</p>
                <p className="font-semibold text-xl text-center md:text-left">Percepita: {Math.ceil(weatherData?.list[0].main.feels_like)}°</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-4">
                <p className="font-semibold text-xl text-center md:text-left">
                  Umidità: {weatherData?.list[0].main.humidity}
                  <span className="text-sm">%</span>
                </p>
                <p className="font-semibold text-xl text-center md:text-left">
                  Pressione: {weatherData?.list[0].main.pressure}
                  <span className="text-sm">mbar</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* risultati meteo ogni 3 ore */}
        <div className="mb-8">
          <div className="rounded-xl backdrop-blur-lg bg-white/40 text-white py-4 md:px-2 border-2">
            <div className="px-5">
              <p className="font-bold text-lg pb-4 text-center md:text-start">Previsione Oraria</p>
              <div className="grid grid-cols-3">
                {weatherMatrix[0]?.map((hour) => (
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-lg">{Math.ceil(hour?.main.temp)}</p>
                    <img src={`https://openweathermap.org/img/wn/${hour?.weather[0].icon}@2x.png`} alt="" />
                    <p className="text-sm">{hour?.dt_txt.split(" ")[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* risultati meteo prossimi 5 giorni */}
        <div className="mb-8">
          <div className="rounded-xl backdrop-blur-lg bg-white/40 text-white py-4 md:px-2 border-2">
            <div className="px-5">
              <p className="font-bold text-lg pb-4 text-center md:text-start">Previsione per 5 giorni</p>
              <div>
                {weatherMatrix.map((day, index) => (
                  <div key={index} className="">
                    {day.map((hour) => (
                      <div key={hour.dt} className="grid grid-cols-3 items-center place-items-center">
                        <div>
                          <p className="text-xs">{hour?.dt_txt.split(" ")[0]}</p>
                          <p className="text-xs">{hour?.dt_txt.split(" ")[1]}</p>
                        </div>
                        <p className="font-semibold text-lg">{Math.ceil(hour?.main.temp)}°</p>
                        <img src={`https://openweathermap.org/img/wn/${hour?.weather[0].icon}@2x.png`} alt="" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
