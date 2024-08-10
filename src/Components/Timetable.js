import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Timetable = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Simulate fetching weather data
    const data = [
      { time: '6:00 AM', temperature: '15°C', condition: 'Clear' },
      { time: '9:00 AM', temperature: '18°C', condition: 'Partly Cloudy' },
      { time: '12:00 PM', temperature: '22°C', condition: 'Sunny' },
      { time: '3:00 PM', temperature: '24°C', condition: 'Sunny' },
      { time: '6:00 PM', temperature: '20°C', condition: 'Clear' },
      { time: '9:00 PM', temperature: '16°C', condition: 'Cloudy' },
      // Add more rows as needed
    ];
    setWeatherData(data);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #4A90E2, #f5f5f5)', // Background style
        textAlign: 'center',
        color: '#333',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Weather Timetable
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Temperature</TableCell>
              <TableCell align="center">Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.temperature}</TableCell>
                <TableCell align="center">{row.condition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Timetable;
