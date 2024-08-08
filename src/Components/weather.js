import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ClearDayIcon from '../assets/clear-day.svg';
import ThunderstormIcon from '../assets/thunderstorms-night-rain.svg';
import SnowIcon from '../assets/snow.svg';
import FogIcon from '../assets/fog.svg';
import RainIcon from '../assets/rainIcon.svg';
import CloudyIcon from '../assets/partly-cloudy-day.svg';
import { ReactComponent as CelsiusIcon } from '../assets/celsius.svg';
import { ReactComponent as FahrenheitIcon } from '../assets/fahrenheit.svg';
import moment from 'moment-timezone';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [cityTime, setCityTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const API_KEY = 'cb8a24eda19aec99706e3ce761cb5881';

  const getCurrentUserId = () => {
    return 'user-id';
  };

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

      await saveWeatherData(cityName, response.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  const fetchWeatherForDate = async (cityName, date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      const selectedWeather = response.data.list.find(entry => entry.dt_txt === date);
      setWeather(selectedWeather);
      setCityTime(moment(selectedWeather.dt_txt).format('dddd HH:mm'));

      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  const saveWeatherData = async (cityName, weatherData) => {
    try {
      const userId = getCurrentUserId();

      const existingCityResponse = await axios.get('http://localhost:5000/cities');
      const existingCities = existingCityResponse.data;
      const existingCity = existingCities.find(city => city.name === cityName && city.userId === userId);

      if (existingCity) {
        await axios.delete(`http://localhost:5000/cities/${existingCity.id}`);
      }

      await axios.post('http://localhost:5000/cities', {
        name: cityName,
        weatherData: weatherData,
        userId: userId
      });
    } catch (error) {
      console.error('Error saving city data to JSON server:', error);
    }
  };

  const handleSearch = () => {
    if (city.trim() === '') {
      setError('City name cannot be empty');
      return;
    }
    fetchWeather(city);
    localStorage.setItem('lastSearchedCity', city);
  };

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300)
      return <img src={ThunderstormIcon} alt="Thunderstorm" style={{ width: '100px', height: '100px' }} />;
    if (weatherId >= 300 && weatherId < 500)
      return <img src={RainIcon} alt="Drizzle" style={{ width: '100px', height: '100px' }} />;
    if (weatherId >= 500 && weatherId < 600)
      return <img src={ThunderstormIcon} alt="Rain" style={{ width: '100px', height: '100px' }} />;
    if (weatherId >= 600 && weatherId < 700)
      return <img src={SnowIcon} alt="Snow" style={{ width: '100px', height: '100px' }} />;
    if (weatherId >= 700 && weatherId < 800)
      return <img src={FogIcon} alt="Fog" style={{ width: '100px', height: '100px' }} />;
    if (weatherId === 800)
      return <img src={ClearDayIcon} alt="Clear Sky" style={{ width: '100px', height: '100px' }} />;
    if (weatherId > 800)
      return <img src={CloudyIcon} alt="Cloudy" style={{ width: '100px', height: '100px' }} />;
    return null;
  };

  useEffect(() => {
    const fetchLastCity = async () => {
      try {
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        if (lastSearchedCity) {
          setCity(lastSearchedCity);
          await fetchWeather(lastSearchedCity);
        }
      } catch (error) {
        console.error('Error fetching last city data:', error);
      }
    };

    fetchLastCity();
  }, []);

  const chartData = forecast?.map((entry) => ({
    date: moment(entry.dt_txt).format('DD-MMM'),
    temp: entry.main.temp,
    timestamp: entry.dt_txt, // Adding timestamp for easy lookup
  })) || [];

  const handleChartClick = (e) => {
    if (e.activePayload && e.activePayload.length > 0) {
      const selectedDate = e.activePayload[0].payload.timestamp;
      setSelectedDate(selectedDate);
      fetchWeatherForDate(city, selectedDate);
    }
  };

  return (
    <Box sx={{ padding: '20px', textAlign: 'center', position: 'relative', margin: '0px' }}>
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: '100%', marginRight: '10px' }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            width: '40px',
            height: '80px',
            borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
            backgroundColor: '#007BFF',
            color: '#fff',
            textAlign: 'center',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
        {weather && (
          <>
            <Box>
              {getWeatherIcon(weather.weather[0].id)}
              <Typography variant="h6" sx={{ marginTop: '10px' }}>
                {cityTime || 'Time will be displayed here'}
              </Typography>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                Temperature: {weather.main.temp}
                <Box component="span" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  {unit === 'metric' ? (
                    <CelsiusIcon style={{ width: '50px', height: '50px' }} />
                  ) : (
                    <FahrenheitIcon style={{ width: '50px', height: '50px' }} />
                  )}
                </Box>
              </Typography>
              <Box sx={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="body1"><strong>Humidity:</strong> {weather.main.humidity}%</Typography>
                <Typography variant="body1"><strong>Wind Speed:</strong> {weather.wind.speed} m/s</Typography>
                <Typography variant="body1"><strong>Description:</strong> {weather.weather[0].description}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={handleUnitChange}
        sx={{ marginTop: '20px' }}
      >
        <ToggleButton value="metric" aria-label="Celsius">
          <CelsiusIcon style={{ width: '24px', height: '24px', marginRight: '5px' }} />
        </ToggleButton>
        <ToggleButton value="imperial" aria-label="Fahrenheit">
          <FahrenheitIcon style={{ width: '24px', height: '24px', marginRight: '5px' }} />
        </ToggleButton>
      </ToggleButtonGroup>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        weather && (
          <Box sx={{ marginTop: '30px', height: '300px' }}>
            <Typography variant="h6">5-Day Forecast</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )
      )}
    </Box>
  );
};

export default Weather;
