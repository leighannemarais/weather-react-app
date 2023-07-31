import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

export default function Weather() {
  let weatherData = {
    city: "New York",
    date: "Tuesday 10:00",
    description: "Cloudy",
    imgUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    humidity: "80%",
    wind: "30 km/h",
    temp: "19",
  };
  function SearchEngine() {
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});

    function displayWeather(response) {
      setLoaded(true);
      setWeather({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        description: response.data.weather[0].description,
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=502dc8f7ae36e57af1974e18d16a86f8&units=metric`;
      axios.get(apiUrl).then(displayWeather);
    }

    function updateCity(event) {
      setCity(event.target.value);
    }

    let form = (
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city" onChange={updateCity} />
        <button type="Submit">Search</button>
      </form>
    );

    if (loaded) {
      return (
        <div>
          {form}
          <ul>
            <li>Temperature: {Math.round(weather.temperature)}°C</li>
            <li>Description: {weather.description}</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind}km/h</li>
            <li>
              <img src={weather.icon} alt="Weather Icon" />
            </li>
          </ul>
        </div>
      );
    } else {
      return form;
    }
  }
  return (
    <div className="Weather">
      <div className="overview">
        <h1>{weatherData.city}</h1>

        <li>Last updated: {weatherData.date}</li>
        <li>{weatherData.description}</li>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="d-flex weather-temperature">
            <img src={weatherData.imgUrl} alt="Clear" />
            <div>
              <strong>{weatherData.temp}</strong>
              <span className="units"> °C</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {weatherData.humidity}</li>
            <li>Wind: {weatherData.wind}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
