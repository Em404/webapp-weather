import { React, useEffect, useState } from "react";
import "./styles/App.css";
import { doFetch } from "./api/fetch";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import Forecast from "./components/Forecast";
import Header from "./components/Header";

function App() {
  // dichiarazione variabili di stato
  const [data, setData] = useState(); // dati della città
  const [searchValue, setSearchValue] = useState(); // valore della query di ricerca
  const [weatherData, setWeatherData] = useState(); // dati meteo della città
  const [weatherMatrix, setWeatherMatrix] = useState([]); // dati meteo suddivisi per giorni

  // funzione asincrona che ottiene i dati della città in base al nome e salva i dati in "data"
  const getData = async (cityName) => {
    try {
      const cityData = await doFetch(`geo/1.0/direct?q=${cityName}`, "GET");
      setData(cityData);
    } catch (error) {
      console.error("Errore durante la ricerca della città:", error);
    }
  };

  // All'avvio dell'app, recupera i dati per la città di Roma
  // [] vuoto esegue lo useEffect solo all'avvio del componente 
  useEffect(() => {
    getData("Rome");
  }, []);

  // viene eseguito ogni volta che cambia "data"
  // recupera i dati utilizzando le coordinate ottenute dallo stato "data"
  useEffect(() => {
    async function getWeatherData() {
      try {
        if (data && data.length > 0) {
          const weatherData = await doFetch(
            `data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric`,
            "GET"
          );
          console.log('weatherdata', weatherData);
          setWeatherData(weatherData);

          const weatherMatrix = [];
          for (let i = 0; i < 6; i++) {
            const date = new Date();

            date.setDate(date.getDate() + i);

            weatherMatrix.push(
              weatherData?.list.filter(
                (li) => li.dt_txt.split(" ")[0] === date.toLocaleDateString("en-CA")
              )
            );
          }
          console.log('weathermatrix', weatherMatrix)
          setWeatherMatrix(weatherMatrix);
        }
      } catch (error) {
        console.error("Errore durante il recupero dei dati meteorologici:", error);
      }
    }

    getWeatherData();
  }, [data]);

  // funzione che chiama getData con la query di ricerca
  const search = async () => {
    try {
      await getData(searchValue);
    } catch (error) {
      console.error(error);
    }
  };

  // funzione che gestisce l'evento di pressione del tasto enter e chiama la funzione search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#f8007d] to-[#4DE3FC] min-h-screen">
      <div className="container mx-auto py-8 px-8 md:px-32">
        <Header />
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
