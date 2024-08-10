import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Weather from './weather.js';

const Landing = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
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
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ zIndex: 1 }}
          >
            <MenuIcon sx={{ color: '#007BFF', fontSize: '2rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '20px', paddingTop: '80px' }}>
        <Weather />
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate('/home')}>
          <HomeIcon sx={{ mr: 1 }} />
          Home
        </MenuItem>
        <MenuItem onClick={() => navigate('/location')}>
          <LocationOnIcon sx={{ mr: 1 }} />
          Location
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Landing;
