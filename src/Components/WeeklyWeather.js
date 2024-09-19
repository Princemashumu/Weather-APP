import React from 'react';
import { Box, Typography } from '@mui/material';
import ClearDayIcon from '../assets/clear-day.svg';
import ThunderstormIcon from '../assets/thunderstorms-night-rain.svg';
import SnowIcon from '../assets/snow.svg';
import FogIcon from '../assets/fog.svg';
import RainIcon from '../assets/rainIcon.svg';
import CloudyIcon from '../assets/partly-cloudy-day.svg';

const getWeatherIcon = (weatherId) => {
  const iconStyle = { width: '30px', height: '30px' };
  if (weatherId >= 200 && weatherId < 300)
    return <img src={ThunderstormIcon} alt="Thunderstorm" style={iconStyle} />;
  if (weatherId >= 300 && weatherId < 500)
    return <img src={RainIcon} alt="Drizzle" style={iconStyle} />;
  if (weatherId >= 500 && weatherId < 600)
    return <img src={ThunderstormIcon} alt="Rain" style={iconStyle} />;
  if (weatherId >= 600 && weatherId < 700)
    return <img src={SnowIcon} alt="Snow" style={iconStyle} />;
  if (weatherId >= 700 && weatherId < 800)
    return <img src={FogIcon} alt="Fog" style={iconStyle} />;
  if (weatherId === 800)
    return <img src={ClearDayIcon} alt="Clear Sky" style={iconStyle} />;
  if (weatherId > 800)
    return <img src={CloudyIcon} alt="Cloudy" style={iconStyle} />;
  return null;
};

const WeeklyWeather = ({ weeklyData = [] }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: '#333',
      borderRadius: '10px',
      border: '1px solid white',
      gap: '10px',
      overflowX: 'auto',  // Ensure scroll if needed
    }}>
      {weeklyData.length > 0 ? (
        weeklyData.map((day, index) => (
          <Box key={index} sx={{
            borderRadius: '10px',
            border: '1px solid white',
            backgroundColor: '#444',
            padding: '10px',
            textAlign: 'center',
            width: '100px',
          }}>
            <Typography variant="body2">{day.day}</Typography>
            <Box sx={{ margin: '5px 0' }}>
              {getWeatherIcon(day.weatherId)}
            </Box>
            <Typography variant="body2">{day.temperature}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="white">No data available</Typography>
      )}
    </Box>
  );
};

export default WeeklyWeather;
