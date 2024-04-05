import { React, useEffect, useState } from "react";
import "./styles/App.css";
import { doFetch } from "./api/fetch";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import Forecast from "./components/Forecast";

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
      // const cityData = await doFetch(`data/2.5/weather?q=${searchValue}`, "GET");
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
    // <div className="bg-[#1f2020]">
    <div className="bg-gradient-to-r from-[#D75DE9] to-[#3FAEB8]">
      <div className="container mx-auto py-8 px-8 md:px-32">
        {/* Ricerca */}
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} search={search} handleKeyDown={handleKeyDown}/>
        <div className="grid lg:grid-cols-12 lg:grid-rows-8 gap-4 mt-4 xl:mt-6">
          <div className="lg:row-start-1 lg:row-end-6 lg:col-start-1 lg:col-end-5">
            {/* Risultati meteo corrente */}
            <CurrentWeather weatherData={weatherData} />
          </div>
          <div className="lg:row-start-6 lg:row-end-9 lg:col-start-1 lg:col-end-5">
             {/* Risultati meteo ogni 3 ore */}
             <DailyWeather weatherMatrix={weatherMatrix} />
          </div>
          <div className="lg:row-start-1 lg:row-end-9 lg:col-start-5 lg:col-end-13">
            {/* Risultati meteo prossimi 5 giorni */}
            <Forecast weatherMatrix={weatherMatrix} />
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
