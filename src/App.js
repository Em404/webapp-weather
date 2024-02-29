import { React, useState } from "react";
import "./styles/App.css";
import { doFetch } from "./api/fetch";

function App() {
  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState("");

  const search = async () => {
    try {
      const cityData = await doFetch(`?q=${searchValue}`, "GET");
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
    <div className="bg-gradient-to-r from-cyan-500 to-purple-500">
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
        <div className="mt-8">
          <div className="rounded-xl backdrop-blur-lg bg-white/40 text-white py-4 md:px-2 border-2">
            <div className="divide-y divide-white px-5">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <p className="font-bold text-xl text-center md:text-left">{data?.name}</p>
                <div className="grid grid-cols-2 items-center text-center md:text-left">
                  <p className="font-semibold text-5xl">{Math.ceil(data?.main.temp)}°</p>
                  <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                <p className="font-semibold text-xl text-center md:text-left">Minima: {Math.ceil(data?.main.temp_min)}°</p>
                <p className="font-semibold text-xl text-center md:text-left">Massima: {Math.ceil(data?.main.temp_max)}°</p>
                <p className="font-semibold text-xl text-center md:text-left">Percepita: {Math.ceil(data?.main.feels_like)}°</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-4">
                <p className="font-semibold text-xl text-center md:text-left">
                  Umidità: {data?.main.humidity}
                  <span className="text-sm">%</span>
                </p>
                <p className="font-semibold text-xl text-center md:text-left">
                  Pressione: {data?.main.pressure}
                  <span className="text-sm">mbar</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* risultati meteo ogni 3 ore */}


        {/* risultati meteo prossimi 4 giorni */}

      </div>
    </div>
  );
}

export default App;
