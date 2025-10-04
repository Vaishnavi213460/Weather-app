import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "57632f6503f049e8abe142304250410"; 

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>Weather App</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather}>Search</button>

      {/* Loading Message */}
      {loading && <p>Loading data...</p>}

      {/* Weather Info */}
      {weatherData && (
        <div className="weather-cards" style={{ marginTop: "20px" }}>
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
