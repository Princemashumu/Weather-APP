import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import ClearDayIcon from '../assets/clear-day.svg';
import ThunderstormIcon from '../assets/thunderstorms-night-rain.svg';
import SnowIcon from '../assets/snow.svg';
import FogIcon from '../assets/fog.svg';
import RainIcon from '../assets/rainIcon.svg';
import CloudyIcon from '../assets/partly-cloudy-day.svg';
import moment from 'moment-timezone';
import HourlyWeather from './HourlyWeather';
import WeeklyWeather from './WeeklyWeather'; // Import WeeklyWeather component
import { v4 as uuidv4 } from 'uuid';

const Weather = ({ unit }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [cityTime, setCityTime] = useState('');
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const API_KEY = 'cb8a24eda19aec99706e3ce761cb5881';

  useEffect(() => {
    // Check for saved city in local storage
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
    } else {
      setCity('soweto'); // Fallback city if no city is saved
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [unit, city]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      setWeather(response.data.list[0]);
      setForecast(response.data.list.slice(0, 40));

      const timezone = response.data.city.timezone;
      const currentTime = moment().utcOffset(timezone / 60);
      setCityTime(currentTime.format('dddd HH:mm'));

      // Extract hourly weather data
      const hourly = response.data.list.slice(0, 8);
      setHourlyWeather(hourly.map(entry => ({
        time: moment(entry.dt_txt).format('h:mm A'),
        temperature: `${entry.main.temp}°${unit === 'metric' ? 'C' : 'F'}`,
        weatherId: entry.weather[0].id,
      })));

      // Extract and process weekly weather data
      const dailyData = [];
      let currentDay = null;
      let dayTemp = 0;
      let count = 0;
      response.data.list.forEach(entry => {
        const day = moment(entry.dt_txt).format('ddd');
        if (currentDay !== day) {
          if (currentDay) {
            dailyData.push({
              day: currentDay,
              temperature: `${(dayTemp / count).toFixed(1)}°${unit === 'metric' ? 'C' : 'F'}`,
              weatherId: entry.weather[0].id,
            });
          }
          currentDay = day;
          dayTemp = 0;
          count = 0;
        }
        dayTemp += entry.main.temp;
        count++;
      });
      setWeeklyWeather(dailyData);

      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  const handleAddLocation = () => {
    if (newLocation.trim() === '') return;
    const newLocationObj = { id: uuidv4(), name: newLocation };
    setLocations([...locations, newLocationObj]);
    setCity(newLocation);
    localStorage.setItem('city', newLocation); // Save to local storage
    setNewLocation('');
  };

  const handleCardClick = (location) => {
    setCity(location.name);
    localStorage.setItem('city', location.name); // Save to local storage
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300)
      return <img src={ThunderstormIcon} alt="Thunderstorm" style={{ width: '200px', height: '200px' }} />;
    if (weatherId >= 300 && weatherId < 500)
      return <img src={RainIcon} alt="Drizzle" style={{ width: '200px', height: '200px' }} />;
    if (weatherId >= 500 && weatherId < 600)
      return <img src={ThunderstormIcon} alt="Rain" style={{ width: '200px', height: '200px' }} />;
    if (weatherId >= 600 && weatherId < 700)
      return <img src={SnowIcon} alt="Snow" style={{ width: '200px', height: '200px' }} />;
    if (weatherId >= 700 && weatherId < 800)
      return <img src={FogIcon} alt="Fog" style={{ width: '200px', height: '200px' }} />;
    if (weatherId === 800)
      return <img src={ClearDayIcon} alt="Clear Sky" style={{ width: '200px', height: '200px' }} />;
    if (weatherId > 800)
      return <img src={CloudyIcon} alt="Cloudy" style={{ width: '200px', height: '200px' }} />;
    return null;
  };

  return (
    <Box sx={{ padding: '0' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Weather in {city}
      </Typography>

      {/* Current Weather Box */}
      <Box sx={{
        border: '1px solid white',
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '25px',
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '150px',
        }}>
          <Box sx={{ width: '150px', display: 'flex', justifyContent: 'center' }}>
            {weather && getWeatherIcon(weather.weather[0].id)}
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingLeft: '20px',
            borderRadius: '25px',
          }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4">
                {weather ? `${weather.main.temp}°${unit === 'metric' ? 'C' : 'F'}` : '--'}
              </Typography>
              <Typography variant="h6">
                <strong>Temperature</strong>
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4">
                {weather ? `${weather.main.humidity}%` : '--'}
              </Typography>
              <Typography variant="h6">
                <strong>Humidity</strong>
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4">
                {weather ? `${weather.wind.speed} m/s` : '--'}
              </Typography>
              <Typography variant="h6">
                <strong>Wind Speed</strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Hourly Weather Box */}
        <Box sx={{
          display: 'flex',
          paddingLeft: '20px',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
          {hourlyWeather.length > 0 && (
            <HourlyWeather hourlyData={hourlyWeather} />
          )}
        </Box>

        {/* Weekly Weather Box */}
        <Box sx={{
          display: 'flex',
          paddingLeft: '20px',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          {weeklyWeather.length > 0 && (
            <WeeklyWeather weeklyData={weeklyWeather} />
          )}
        </Box>
      </Box>

      {/* Location Management Section */}
      <Box sx={{
        border: '1px solid white',
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '25px',
        marginTop: '20px',
      }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Manage Locations
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
          <TextField
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Add new location"
            sx={{ flex: 1, marginRight: '10px' }}
          />
          <Button 
  variant="contained" 
  onClick={handleAddLocation}
  sx={{
    backgroundColor: '#4caf50', // Match background color
    color: '#ffffff', // Text color
    border: '1px solid #4caf50', // Border color
    fontWeight: 'bold', // Make text bold
    borderRadius: '8px', // Rounded corners
    padding: '8px 16px', // Padding for the button
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)', // Shadow effect
    transition: 'background-color 0.3s, color 0.3s', // Smooth transition effect
    '&:hover': {
      backgroundColor: '#388e3c', // Darker green on hover
      color: '#ffffff', // Keep text color on hover
      borderColor: '#388e3c', // Border color on hover
    },
    '&:active': {
      boxShadow: 'none', // Remove shadow on click
      transform: 'scale(0.95)', // Slightly shrink on click
    },
  }}
>
  Add Location
</Button>

        </Box>
        <Box>
          {locations.map(location => (
            <Card
              key={location.id}
              sx={{ marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleCardClick(location)}
            >
              <CardContent>
                <Typography variant="h6">{location.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;
