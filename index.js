// index.js
const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Weather Microservice!");
});

//http://localhost:3000/weather?latitude=37.3382&longitude=-121.8863

//http://localhost:3000/weather?latitude=37.3382&longitude=-121.8863&units=metric

// Example route to fetch weather data
app.get("/weather", async (req, res) => {
  const { latitude, longitude, units = "imperial" } = req.query; // Default to 'imperial' if units is not provided
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // Construct the URL with the units parameter
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${units}`;

  try {
    // Step 1: Fetch data
    const response = await axios.get(url);
    const weatherData = response.data;

    // Step 2: Extract the necessary data from current and daily
    const cleanedData = {
      lat: weatherData.lat,
      lon: weatherData.lon,
      timezone: weatherData.timezone,
      units, // Include units in the response so the client knows the format
      broadcast: []
    };

    // Step 3: Add the current day's data to broadcast array
    cleanedData.broadcast.push({
      dt: weatherData.current.dt,
      summary: weatherData.current.weather[0]?.main || "No summary",
      temp_min: weatherData.daily[0]?.temp?.min || weatherData.current.temp,
      temp_max: weatherData.daily[0]?.temp?.max || weatherData.current.temp,
      feels_like: weatherData.current.feels_like,
      humidity: weatherData.current.humidity,
      wind_speed: weatherData.current.wind_speed,
      uvi: weatherData.current.uvi,
      description: weatherData.current.weather[0]?.description || "No description"
    });

    // Step 4: Add each of the next 7 days from daily array to broadcast array
    for (let i = 0; i < 7; i++) {
      const day = weatherData.daily[i];
      cleanedData.broadcast.push({
        dt: day.dt,
        summary: day.summary || day.weather[0]?.main || "No summary",
        temp_min: day.temp.min,
        temp_max: day.temp.max,
        feels_like: day.feels_like.day,
        humidity: day.humidity,
        wind_speed: day.wind_speed,
        uvi: day.uvi,
        description: day.weather[0]?.description || "No description"
      });
    }

    // Step 5: Send cleaned data to the client
    res.json(cleanedData);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
