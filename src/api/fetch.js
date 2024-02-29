const apiKey = "&appid=1133f48a2224dd93bd0fb8aa7e71bd09";

// per trovare latitudine e longitudine
const API_REQUEST_URL_GEO = "https://api.openweathermap.org/geo/1.0/direct";

// per avere meteo corrente
const API_REQUEST_URL_CURRENT = "https://api.openweathermap.org/data/2.5/weather";

// per avere il meteo di 5 giorni diviso in 3 ore
const API_REQUEST_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast"; //lat e lon

const metric = "&units=metric";
const limit = "&limit=5";

export const doFetch = async (url, method, body) => {
  const URL_GEO = "https://cors-anywhere.herokuapp.com/" + API_REQUEST_URL_GEO + url + limit + apiKey;
  const URL_CURRENT = "https://cors-anywhere.herokuapp.com/" + API_REQUEST_URL_CURRENT + url + metric + apiKey;
  const URL_FORECAST = "";

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ? body : {}),
  };

  if (!body) delete options.body;

  try {
    const response = await fetch(URL_CURRENT, options);
    if (!response.ok) {
      throw new Error("Errore");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
