import React from "react";

function CurrentWeather({ weatherData }) {
  return (
    <div className="">
      <div className="rounded-xl backdrop-blur-lg bg-[#072435]/40 text-white py-4 md:px-2 border-2">
        <div className="px-5 current-container">
          <div className="grid grid-cols-1 items-center">
            <p className="font-bold text-xl md:text-4xl lg:text-xl xl:text-3xl text-center lg:text-left">
              {weatherData?.city.name}, {weatherData?.city.country}
            </p>
            <div className="flex place-content-center lg:place-content-start items-center text-center lg:text-left">
              <p className="font-semibold text-5xl lg:text-4xl">{Math.ceil(weatherData?.list[0].main.temp)}°</p>
              <img src={`https://openweathermap.org/img/wn/${weatherData?.list[0].weather[0].icon}@2x.png`} alt="" />
            </div>
            {/* <p className="font-bold text-xl text-center md:text-left">{weatherData?.list[0].weather[0].main}, {weatherData?.list[0].weather[0].description}</p> */}
          </div>
          <p className="font-semibold text-xl text-center lg:text-left pb-4">Percepita: {Math.ceil(weatherData?.list[0].main.feels_like)}°</p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <p className="font-semibold text-xl text-center lg:text-left">Minima: {Math.ceil(weatherData?.list[0].main.temp_min)}°</p>
            <p className="font-semibold text-xl text-center lg:text-left">Massima: {Math.ceil(weatherData?.list[0].main.temp_max)}°</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl backdrop-blur-lg bg-[#072435]/40 text-white py-4 md:px-2 border-2 mt-4 xl:mt-6">
        <div className="px-5 current-container">
          <div className="md:py-4">
            <p className="font-semibold xl:text-xl text-center lg:text-left">
              Umidità: {weatherData?.list[0].main.humidity}
              <span className="text-sm">%</span>
            </p>
            <p className="font-semibold xl:text-xl text-center lg:text-left">
              Pressione: {weatherData?.list[0].main.pressure}
              <span className="text-sm">mbar</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
