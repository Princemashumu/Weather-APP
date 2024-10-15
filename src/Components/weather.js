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
import WeeklyWeather from './WeeklyWeather';
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
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
    } else {
      setCity('soweto');
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

      const hourly = response.data.list.slice(0, 8);
      setHourlyWeather(hourly.map(entry => ({
        time: moment(entry.dt_txt).format('h:mm A'),
        temperature: `${entry.main.temp}°${unit === 'metric' ? 'C' : 'F'}`,
        weatherId: entry.weather[0].id,
      })));

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
    localStorage.setItem('city', newLocation);
    setNewLocation('');
  };

  const handleCardClick = (location) => {
    setCity(location.name);
    localStorage.setItem('city', location.name);
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300)
      return <img src={ThunderstormIcon} alt="Thunderstorm" style={{ width: '150px', height: '150px' }} />;
    if (weatherId >= 300 && weatherId < 500)
      return <img src={RainIcon} alt="Drizzle" style={{ width: '150px', height: '150px' }} />;
    if (weatherId >= 500 && weatherId < 600)
      return <img src={ThunderstormIcon} alt="Rain" style={{ width: '150px', height: '150px' }} />;
    if (weatherId >= 600 && weatherId < 700)
      return <img src={SnowIcon} alt="Snow" style={{ width: '150px', height: '150px' }} />;
    if (weatherId >= 700 && weatherId < 800)
      return <img src={FogIcon} alt="Fog" style={{ width: '150px', height: '150px' }} />;
    if (weatherId === 800)
      return <img src={ClearDayIcon} alt="Clear Sky" style={{ width: '150px', height: '150px' }} />;
    if (weatherId > 800)
      return <img src={CloudyIcon} alt="Cloudy" style={{ width: '150px', height: '150px' }} />;
    return null;
  };

  return (
    <Box
      sx={{
        padding: '0',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: { xs: '10px', sm: '20px', md: '30px' },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: '20px',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Weather in {city}
      </Typography>

      <Box
        sx={{
          border: '1px solid white',
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '25px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '150px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: { xs: '20px', sm: '0' },
          }}
        >
          {weather && getWeatherIcon(weather.weather[0].id)}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            flex: 1,
            paddingLeft: { xs: '0', sm: '20px' },
            borderRadius: '25px',
            textAlign: 'center',
          }}
        >
          <Box sx={{ flex: 1, marginBottom: { xs: '10px', sm: '0' } }}>
            <Typography variant="h4">
              {weather ? `${weather.main.temp}°${unit === 'metric' ? 'C' : 'F'}` : '--'}
            </Typography>
            <Typography variant="h6">
              <strong>Temperature</strong>
            </Typography>
          </Box>
          <Box sx={{ flex: 1, marginBottom: { xs: '10px', sm: '0' } }}>
            <Typography variant="h4">
              {weather ? `${weather.main.humidity}%` : '--'}
            </Typography>
            <Typography variant="h6">
              <strong>Humidity</strong>
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">
              {weather ? `${weather.wind.speed} m/s` : '--'}
            </Typography>
            <Typography variant="h6">
              <strong>Wind Speed</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box 
  sx={{ 
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center' // Centering the content
  }}
>
        {hourlyWeather.length > 0 && <HourlyWeather hourlyData={hourlyWeather} />}
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        {weeklyWeather.length > 0 && <WeeklyWeather weeklyData={weeklyWeather} />}
      </Box>

      <Box
        sx={{
          border: '1px solid white',
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '25px',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Manage Locations
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
          <TextField
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Add a new location"
            variant="outlined"
            fullWidth
          />
          <Button onClick={handleAddLocation} sx={{ marginLeft: '10px' }} variant="contained">
            Add
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {locations.map((location) => (
            <Card
              key={location.id}
              sx={{
                minWidth: '150px',
                maxWidth: '200px',
                margin: '10px',
                cursor: 'pointer',
                backgroundColor: location.name === city ? '#555' : '#444',
                '&:hover': { backgroundColor: '#666' },
              }}
              onClick={() => handleCardClick(location)}
            >
              <CardContent>
                <Typography variant="subtitle1">{location.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;
