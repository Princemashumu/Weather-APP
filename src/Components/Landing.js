import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaCog } from 'react-icons/fa';
import SettingsDialog from './SettingsDialog';
import Weather from './weather'; // Ensure this import is correct
import LocationPromptDialog from './LocationPromptDialog'; // Import the new dialog component

const Landing = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [openLocationPrompt, setOpenLocationPrompt] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDaytime(hour >= 6 && hour < 18);

    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    setCurrentDate(now.toLocaleDateString(undefined, options));
  }, []);


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const handleLocationPromptClose = () => {
    setOpenLocationPrompt(false);
  };

  const handleLocationAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cb8a24eda19aec99706e3ce761cb5881`)
            .then(response => response.json())
            .then(data => {
              setCity(data.name);
              handleLocationPromptClose();
            })
            .catch(err => {
              setError('Error fetching location data.');
              handleLocationPromptClose();
            });
        },
        (error) => {
          setError('Error retrieving your location.');
          handleLocationPromptClose();
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      handleLocationPromptClose();
    }
  };

  const handleLocationDeny = () => {
    setError('Location access denied.');
    handleLocationPromptClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'black',
        textAlign: 'center',
        paddingBottom: '64px',
        overflowX: 'hidden',
        color: 'white',
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingX: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '16px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                marginRight: '16px',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {currentDate}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="settings"
              onClick={handleSettingsOpen}
              sx={{ zIndex: 1 }}
            >
              <FaCog style={{ color: '#007BFF', fontSize: '2rem' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '20px', paddingTop: '80px' }}>
        {error ? (
          <Typography variant="h6" sx={{ color: 'red' }}>
            {error}
          </Typography>
        ) : (
          city && <Weather unit={unit} city={city} />
        )}
        
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate('/locations')}>
          <LocationOnIcon sx={{ mr: 1 }} />
          My Locations
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      <SettingsDialog
        open={openSettings}
        onClose={handleSettingsClose}
        onUnitChange={handleUnitChange}
      />

      <LocationPromptDialog
        open={openLocationPrompt}
        onClose={handleLocationPromptClose}
        onAllow={handleLocationAllow}
        onDeny={handleLocationDeny}
      />
    </Box>
  );
};

export default Landing;
