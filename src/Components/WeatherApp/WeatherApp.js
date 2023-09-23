import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
import humidity_icon from '../Assests/humidity.png';

const WeatherApp = () => {
  const api_key = "b48264b8297eefcbab4b9e0e3d55be01";
  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherCondition, setWeatherCondition] = useState("");
  
  useEffect(() => {
    // Call the 'search' function when the component mounts to get initial weather data
    search();
  }, []);

  const search = async () => {
    try {
      const element = document.getElementsByClassName("cityInput");
      if (element[0].value === "") {
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;

      const weatherIcon = data.weather[0].icon;

      if (weatherIcon === "01d" || weatherIcon === "01n") {
        setWicon(clear_icon);
        setWeatherCondition("clear");
      } else if (weatherIcon === "02d" || weatherIcon === "02n") {
        setWicon(cloud_icon);
        setWeatherCondition("cloudy");
      } else if (weatherIcon === "03d" || weatherIcon === "03n") {
        setWicon(drizzle_icon);
        setWeatherCondition("drizzle");
      } else if (weatherIcon === "04d" || weatherIcon === "04n") {
        setWicon(drizzle_icon);
        setWeatherCondition("drizzle");
      } else if (weatherIcon === "09d" || weatherIcon === "09n") {
        setWicon(rain_icon);
        setWeatherCondition("rainy");
      } else if (weatherIcon === "10d" || weatherIcon === "10n") {
        setWicon(rain_icon);
        setWeatherCondition("rainy");
      } else if (weatherIcon === "13d" || weatherIcon === "13n") {
        setWicon(snow_icon);
        setWeatherCondition("snowy");
      } else {
        setWicon(clear_icon);
        setWeatherCondition("clear");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const getWeatherAdvice = () => {
    switch (weatherCondition) {
      case "clear":
        return (
          <div className="weather-advice-text">
            It's clear. Don't forget your sunscreen!
          </div>
        );
      case "cloudy":
        return (
          <div className="weather-advice-text">
            It's cloudy. You might not need sunscreen, but carry an umbrella just in case.
          </div>
        );
      case "drizzle":
        return (
          <div className="weather-advice-text">
            It's drizzling. Carry an umbrella.
          </div>
        );
      case "rainy":
        return (
          <div className="weather-advice-text">
            It's raining. Definitely carry an umbrella.
          </div>
        );
      case "snowy":
        return (
          <div className="weather-advice-text">
            It's snowy. Dress warmly and carry an umbrella.
          </div>
        );
      default:
        return "";
    }
  }
  
  const weatherAdvice = getWeatherAdvice();

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className='weather-image' >
        <img src={wicon} alt='' />
      </div>
      <div className='weather-temp'>
        24°C
      </div>
      <div className='weather-location'>
        London
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} className='icon' alt="humidity" />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} className='icon' alt="wind" />
          <div className='data'>
            <div className='wind-rate'>18 km/hr</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
      <div className='weather-advice'>
        {weatherAdvice}
      </div>
    </div>
  )
}

export default WeatherApp;
