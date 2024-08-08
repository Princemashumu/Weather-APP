import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Weather from './weather.js';

const Landing = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleProfileMenuClose();
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken')
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #4A90E2, #f5f5f5)', // Modern gradient background
        textAlign: 'center',
        color: '#333',
        paddingBottom: '64px', // Adjust this value to the height of your AppBar
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ padding: '20px', paddingTop: '80px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>
          Weather Forecast
        </Typography>
        <Weather />
      </Box>

      <AppBar
        position="fixed"
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1e1e1e',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          top: 'auto',
          padding: '10px 0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-around' }}>
          <IconButton color="inherit" aria-label="home">
            <HomeIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton color="inherit" aria-label="location">
            <LocationOnIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircleIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default Landing;
