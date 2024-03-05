import React from "react";
import "../styles/index.css";

function Forecast({ weatherMatrix }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="h-full">
      <div className="rounded-xl backdrop-blur-lg bg-[#072435]/40 text-white py-4 md:px-2 border-2 h-full">
        <div className="px-5">
          <p className="font-bold text-lg pb-4 text-center lg:text-start">Previsione per prossimi 5 giorni/3 ore</p>
          <div className="overflow-auto h-[36rem] forecast-container">
            {weatherMatrix.map((day, index) => (
              <div key={index} className="">
                {day.map((hour) => (
                  <div key={hour.dt} className="grid grid-cols-3 items-center place-items-center lg:place-items-start lg:items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <p className="text-xs md:text-base">{formatDate(hour?.dt_txt.split(" ")[0])}</p>
                      <p className="text-xs md:text-base md:ms-4">{hour?.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}</p>
                    </div>
                    <p className="font-semibold text-lg lg:text-4xl justify-self-center">{Math.ceil(hour?.main.temp)}°</p>
                    <img src={`https://openweathermap.org/img/wn/${hour?.weather[0].icon}@2x.png`} alt="" className="justify-self-center" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
