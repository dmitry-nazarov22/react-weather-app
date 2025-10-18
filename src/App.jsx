import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("helsinki");
  const [forecast, setForecast] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherColor, setWeatherColor] = useState("rgba(255, 255, 255, 0.2)");
  const [isDark, setIsDark] = useState(false);

  const fetchWeatherData = async cityName => {
    try {
      setLoading(true);
      setError(null);

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
      setError("Sorry, we couldn't retrieve the weather data at this time");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  function getWrapperGradient(tempC, condition) {
    const main = condition?.toLowerCase() || "";

    if (main.includes("snow")) {
      return "linear-gradient(to bottom right, #E0EAFC, #CFDEF3)";
    }
    if (main.includes("rain" || "thunderstorm")) {
      return "linear-gradient(to bottom right, #4B79A1, #283E51)";
    }
    if (main.includes("cloud")) {
      return "linear-gradient(to bottom right, #757F9A, #D7DDE8)";
    }
    if (main.includes("clear")) {
      if (tempC > 25) return "linear-gradient(to bottom right, #F7971E, #FFD200)";
      else return "linear-gradient(to bottom right, #56CCF2, #2F80ED)";
    }

    // fallback by temperature
    switch (true) {
      case tempC <= -10:
        return "linear-gradient(to bottom right, #001F3F, #003366)";
      case tempC <= 0:
        return "linear-gradient(to bottom right, #3366FF, #66CCFF)";
      case tempC <= 10:
        return "linear-gradient(to bottom right, #4B79A1, #283E51)";
      case tempC <= 20:
        return "linear-gradient(to bottom right, #56CCF2, #2F80ED)";
      case tempC <= 30:
        return "linear-gradient(to bottom right, #FFB75E, #ED8F03)";
      default:
        return "linear-gradient(to bottom right, #FF512F, #DD2476)";
    }
  }

  function toggleDark() {
    setIsDark(!isDark);
  }

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  useEffect(() => {
    if (weatherData?.main?.temp && weatherData.weather?.[0]) {
      const tempC = Math.round((weatherData.main.temp - 32) / 1.8);
      const condition = weatherData.weather[0].main;
      setWeatherColor(getWrapperGradient(tempC, condition));
    }
  }, [weatherData]);

  useEffect(() => {
    document.body.style.background = isDark
      ? "linear-gradient(to bottom right, #19004bff, #000207ff)"
      : "linear-gradient(to bottom right, #4abfe0ff, #3d5ec0ff)";
  }, [isDark]);

  if (loading) return <div className="wrapper-loading">Loading...</div>;

  return (
    <div className="wrapper" style={{ background: weatherColor }}>
      <button onClick={toggleDark} className="theme-switch-btn">
        Toggle Light
      </button>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error">{error}</p>}
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
