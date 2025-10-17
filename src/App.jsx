import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("helsinki");
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    console.log("Weather data:", weatherData);
    const fetchWeatherData = async cityName => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        console.log(data);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
        );
        const forecastData = await forecastResponse.json();

        const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0);
        setForecast(dailyForecast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData(city);
  }, [city]);

  return (
    <div className="wrapper">
      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temperature">{Math.round((weatherData.main.temp - 32) / 1.8)}°C</p>
            <p className="condition">{weatherData.weather[0].main}</p>
          </div>
          <div className="weather-details">
            <div>
              <p>Humidity</p>
              <p className="weather-details-value">{Math.round(weatherData.main.humidity)}%</p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p className="weather-details-value">
                {Math.round(weatherData.wind.speed * 1.60934)} km/h
              </p>
            </div>
          </div>
        </>
      )}
      {forecast.length > 0 && (
        <>
          <div className="forecast">
            <h2 className="forecast-header">5-Day Forecast</h2>
            <div className="forecast-days">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round((day.main.temp - 32) / 1.8)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
