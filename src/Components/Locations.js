import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    setLocations(savedLocations);
  }, []);

  const handleLocationClick = (location) => {
    navigate('/landing', { state: { selectedLocation: location } });
  };

  return (
    <Box
      sx={{
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #4A90E2, #f5f5f5)',
        minHeight: '100vh',
        color: '#333',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        My Locations
      </Typography>
      {locations.length === 0 ? (
        <Typography variant="body1">No locations found. Search for a city to add it to your locations.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="locations table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#007BFF' }}>Location Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleLocationClick(location)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#e0f7fa',
                    },
                  }}
                >
                  <TableCell align="center" sx={{ fontSize: '1rem' }}>{location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Locations;
