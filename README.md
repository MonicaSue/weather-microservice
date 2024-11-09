# Weather Microservice

## Overview

This weather microservice provides a 7-day weather forecast based on latitude and longitude coordinates. The response includes daily weather summaries, temperature, humidity, wind speed, and other relevant details. Follow the instructions below to programmatically request data and process the response.

## 1. Requesting Data from the Microservice

**Endpoint**:  
`https://weather-microservice-navy.vercel.app/weather`

### Query Parameters:
- **latitude** *(required)*: Latitude of the location.
- **longitude** *(required)*: Longitude of the location.
- **units** *(optional)*: Temperature units for the response. Use `"imperial"` for Fahrenheit or `"metric"` for Celsius. If not provided, the default is `"imperial"`.

### Example Request
**Location**: San Jose, CA  
**Coordinates**: latitude: 37.3382, longitude: -121.8863

```javascript
const url = "https://weather-microservice-navy.vercel.app/weather?latitude=37.3382&longitude=-121.8863&units=metric";
fetch(url)
  .then(response => response.json())
  .then(data => console.log("Weather data:", data))
  .catch(error => console.error("Error fetching data:", error));
## 2. Received Data Example

The following JSON structure represents an example of the data returned by the microservice:

```json
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
    // Other 5 days in the forecast
  ]
}
```

## Main Structure

The weather data returned by the microservice includes the following key fields:

- **lat**: The latitude of the requested location.
- **lon**: The longitude of the requested location.
- **timezone**: The timezone of the requested location (e.g., `"America/Los_Angeles"`).
- **units**: Indicates the temperature units used in the response:
  - `"imperial"` for Fahrenheit
  - `"metric"` for Celsius
- **forecast**: An array of weather data for the next 7 days, each containing the following properties:
  - **dt**: The date and time in Unix timestamp format. Each day's data is based on this timestamp.
  - **date**: A readable date (formatted as MM/DD/YYYY).
  - **day**: The abbreviated name of the day (e.g., `"Wed"` for Wednesday).
  - **summary**: A brief description of the weather conditions, such as `"Clear"`, `"Clouds"`, or `"Rain"`.
  - **temp_min**: The minimum temperature forecasted for the day.
  - **temp_max**: The maximum temperature forecasted for the day.
  - **feels_like**: An object detailing how the temperature will feel throughout the day. This object contains:
    - `day`: Feels-like temperature during the day.
    - `night`: Feels-like temperature at night.
    - `eve`: Feels-like temperature in the evening.
    - `morn`: Feels-like temperature in the morning.
  - **humidity**: The percentage of humidity in the air.
  - **wind_speed**: The wind speed measured in miles per hour if using `"imperial"` units, or kilometers per hour for `"metric"` units.
  - **uvi**: The UV index, which indicates the level of ultraviolet radiation and can be used to gauge sun exposure risk.
  - **description**: A detailed description of the weather conditions (e.g., `"clear sky"`, `"overcast clouds"`, `"light rain"`).

 ## UML Sequence Diagram
  ![uml-sequence-diagram](https://github.com/user-attachments/assets/36340cf7-a577-4a83-999f-2099c5fa2936)


