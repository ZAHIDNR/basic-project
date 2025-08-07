const getApiData = (function () {
  async function getWeatherData(place) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=QH2MRSYX6DGBHL8ASHC5CKHBE&contentType=json`
      );
      const result = await response.json();
      displayControl.renderText(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getGifData(id) {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/${id}?api_key=UoRZp5o76APi3BExEuA9bPIIFkQ4UJg4`
      );
      const data = await response.json();
      displayControl.renderGif(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getWeatherData,
    getGifData,
  };
})();

const displayControl = (function () {
  const weatherGifDisplay = document.querySelector("#weatherGif");
  const SearchInput = document.querySelector(".search-input");
  const temperature = document.querySelector(".temperature");
  const temFeelsLike = document.querySelector("#feelsLike");

  let currentWeatherData = null;

  function renderText(data) {
    currentWeatherData = data;

    const cityName = document.querySelector(".location");
    const humidity = document.querySelector("#humidity");
    const windSpeed = document.querySelector("#windSpeed");
    const pressure = document.querySelector("#pressure");

    cityName.textContent = data.address;
    temperature.textContent = `${data.currentConditions.temp}°F`;
    temFeelsLike.textContent = `${data.currentConditions.feelslike}°F`;
    humidity.textContent = `${data.currentConditions.humidity}%`;
    windSpeed.textContent = `${data.currentConditions.windspeed} mph`;
    pressure.textContent = `${data.currentConditions.pressure} in`;

    const weatherCondition = document.querySelector("#weatherCondition");
    weatherCondition.textContent = data.currentConditions.conditions;

    const icon = data.currentConditions.icon;
    switch (icon) {
      case "clear-day":
      case "clear-night":
        getApiData.getGifData("wNipYAoZ3iaEE");
        break;
      case "partly-cloudy-day":
      case "partly-cloudy-night":
      case "cloudy":
        getApiData.getGifData("dBXNPw0XBdF1n82BBf");
        break;
      case "rain":
      case "showers-day":
      case "showers-night":
        getApiData.getGifData("hWvk9iUU4uBBeyBq0k");
        break;
      case "thunder-rain":
      case "thunder-showers-day":
      case "thunder-showers-night":
        getApiData.getGifData("X0bnTmo4izNfi");
        break;
      case "snow":
      case "snow-showers-day":
      case "snow-showers-night":
        getApiData.getGifData("26xBwFcBGPLNfGbkY");
        break;
      case "fog":
        getApiData.getGifData("oxYzyhHjo4kyxT27CF");
        break;
      case "wind":
        getApiData.getGifData("nI3hgTqQWhOV8WYtYF");
        break;
      default:
        getApiData.getGifData("dBXNPw0XBdF1n82BBf");
    }
  }

  SearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      getApiData.getWeatherData(SearchInput.value);
    }
  });

  function renderGif(url) {
    weatherGifDisplay.style.backgroundImage = `url(${url.data.images.original.url})`;
  }

  window.addEventListener("DOMContentLoaded", () => {
    getApiData.getGifData("MIXWLl5098VoY");
  });

  return {
    renderText,
    renderGif,
    getCurrentWeatherData: () => currentWeatherData,
  };
})();

const tempConvertion = (function () {
  const celsius = document.querySelector("#celsius");
  const fahrenheit = document.querySelector("#fahrenheit");

  const temperature = document.querySelector(".temperature");
  const temFeelsLike = document.querySelector("#feelsLike");

  function convertFtoC(f) {
    return ((f - 32) * 5) / 9;
  }

  function showCelsius() {
    const data = displayControl.getCurrentWeatherData();
    if (!data) return;

    const tempC = convertFtoC(data.currentConditions.temp).toFixed(1);
    const feelsC = convertFtoC(data.currentConditions.feelslike).toFixed(1);

    temperature.textContent = `${tempC}°C`;
    temFeelsLike.textContent = `${feelsC}°C`;
  }

  function showFahrenheit() {
    const data = displayControl.getCurrentWeatherData();
    if (!data) return;

    temperature.textContent = `${data.currentConditions.temp}°F`;
    temFeelsLike.textContent = `${data.currentConditions.feelslike}°F`;
  }

  celsius.addEventListener("click", () => {
    celsius.className = "toggle-option active";
    fahrenheit.className = "toggle-option";
    showCelsius();
  });

  fahrenheit.addEventListener("click", () => {
    fahrenheit.className = "toggle-option active";
    celsius.className = "toggle-option";
    showFahrenheit();
  });
})();
