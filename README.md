Overview

This weather microservice provides a 7-day weather forecast based on latitude and longitude coordinates. Responses include daily weather summaries, temperature, humidity, wind speed, and more. Follow the instructions below to programmatically request data and process the response.

1. Requesting Data from the Microservice

Endpoint: http://localhost:3000/weather

Query Parameters:

- latitude (required): Latitude of the location.
- longitude (required): Longitude of the location.
- units (optional): Temperature units for the response. Use "imperial" for Fahrenheit or "metric" for Celsius. If not provided, the default is "imperial".

Example -  San Jose, CA (latitude: 37.3382, longitude: -121.8863)

const url = "http://localhost:3000/weather?latitude=37.3382&longitude=-121.8863&units=metric";
fetch(url)
  .then(response => response.json())
  .then(data => console.log("Weather data:", data))
  .catch(error => console.error("Error fetching data:", error));

2. Received Data Example
{
  "lat": 37.3382,
  "lon": -121.8863,
  "timezone": "America/Los_Angeles",
  "units": "metric",
  "forecast": [
    {
      "dt": 1634567890,
      "date": "10/18/2021",
      "day": "Mon",
      "summary": "Clear",
      "temp_min": 10.0,
      "temp_max": 20.0,
      "feels_like": 15.0,
      "humidity": 50,
      "wind_speed": 5.0,
      "uvi": 3.0,
      "description": "clear sky"
    },
    {
      "dt": 1634654290,
      "date": "10/19/2021",
      "day": "Tue",
      "summary": "Clouds",
      "temp_min": 12.0,
      "temp_max": 22.0,
      "feels_like": 17.0,
      "humidity": 55,
      "wind_speed": 6.0,
      "uvi": 2.0,
      "description": "scattered clouds"
    },
    // Additional days follow...
  ]
}

3. UML Sequence Diagram







