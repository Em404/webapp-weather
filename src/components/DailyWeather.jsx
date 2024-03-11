import React from "react";

function DailyWeather({ weatherMatrix }) {
  return (
    <div className="h-full">
      <div className="rounded-xl backdrop-blur-lg bg-[#072435]/40 text-white py-4 md:px-2 border-2 h-full">
        <div className="px-5">
          <p className="font-bold text-lg pb-4 text-center lg:text-start">Previsione Oraria</p>
          <div className="flex overflow-x-auto daily-container"> 
            <div className="flex overflow-x-auto">
              {weatherMatrix[0]?.map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="font-semibold text-lg">{Math.ceil(hour?.main.temp)}°</p>
                  <img src={`https://openweathermap.org/img/wn/${hour?.weather[0].icon}@2x.png`} alt="" />
                  <p className="text-sm md:text-base">{hour?.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWeather;
