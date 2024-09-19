import React from 'react';
import { Box, Typography } from '@mui/material';
import ClearDayIcon from '../assets/clear-day.svg';
import ThunderstormIcon from '../assets/thunderstorms-night-rain.svg';
import SnowIcon from '../assets/snow.svg';
import FogIcon from '../assets/fog.svg';
import RainIcon from '../assets/rainIcon.svg';
import CloudyIcon from '../assets/partly-cloudy-day.svg';

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300)
    return <img src={ThunderstormIcon} alt="Thunderstorm" style={{ width: '30px', height: '30px' }} />;
  if (weatherId >= 300 && weatherId < 500)
    return <img src={RainIcon} alt="Drizzle" style={{ width: '30px', height: '30px' }} />;
  if (weatherId >= 500 && weatherId < 600)
    return <img src={ThunderstormIcon} alt="Rain" style={{ width: '30px', height: '30px' }} />;
  if (weatherId >= 600 && weatherId < 700)
    return <img src={SnowIcon} alt="Snow" style={{ width: '30px', height: '30px' }} />;
  if (weatherId >= 700 && weatherId < 800)
    return <img src={FogIcon} alt="Fog" style={{ width: '30px', height: '30px' }} />;
  if (weatherId === 800)
    return <img src={ClearDayIcon} alt="Clear Sky" style={{ width: '30px', height: '30px' }} />;
  if (weatherId > 800)
    return <img src={CloudyIcon} alt="Cloudy" style={{ width: '30px', height: '30px' }} />;
  return null;
};

const HourlyWeather = ({ hourlyData = [] }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px',
      paddingLeft: '20px',
    }}>
      {hourlyData.length > 0 ? (
        hourlyData.map((hour, index) => (
          <Box key={hour.time || index} sx={{
            borderRadius: '10px',
            border: '1px solid white',
            backgroundColor: '#444',
            padding: '10px',
            textAlign: 'center',
            width: '80px',
            hight:'0',
            borderRadius: '45px',  // Updated for consistency
          }}>
            <Typography variant="body2">{hour.time}</Typography>
            <Box sx={{ margin: '5px 0' }}>
              {getWeatherIcon(hour.weatherId)}
            </Box>
            <Typography variant="body2">{hour.temperature}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="white">No hourly data available</Typography>
      )}
    </Box>
  );
};

export default HourlyWeather;
