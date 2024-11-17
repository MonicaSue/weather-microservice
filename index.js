// Import required modules
const express = require("express");
const axios = require("axios");

// Load environment variables from .env file
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Weather Microservice!");
});

// Helper function to convert timestamp to date and day
const getDateAndDayFromTimestamp = (timestamp) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(timestamp * 1000);
  const dayName = daysOfWeek[date.getDay()];
  const humanReadableDate = date.toLocaleString().split(",")[0];
  return [humanReadableDate, dayName];
};

// Example route to fetch weather data
app.get("/weather", async (req, res) => {
  const { latitude, longitude, units = "imperial" } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${units}`;


  console.log("FETCH REQUEST RECEIVED for coordinates:", latitude, longitude);

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    // Prepare data for response
    const cleanedData = {
      lat: weatherData.lat,
      lon: weatherData.lon,
      timezone: weatherData.timezone,
      units,
      forecast: [],
    };

    for (let i = 0; i < 7; i++) {
      const day = weatherData.daily[i];
      const [date, dayOfTheWeek] = getDateAndDayFromTimestamp(day.dt);

      cleanedData.forecast.push({
        dt: day.dt,
        date: date,
        day: dayOfTheWeek,
        summary: day.weather[0]?.main || "No summary",
        temp_min: day.temp.min,
        temp_max: day.temp.max,
        feels_like: day.feels_like,
        humidity: day.humidity,
        wind_speed: day.wind_speed,
        uvi: day.uvi,
        description: day.weather[0]?.description || "No description",
      });
    }

    // Return processed data without delay
    console.log("Returning processed data:", cleanedData);
    res.json(cleanedData);

  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Now waiting for a fetch request...");
});
