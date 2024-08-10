import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4">Settings</Typography>
      <Typography variant="body1">Adjust your application settings here.</Typography>

      {/* Add settings options here */}
    </Box>
  );
};

export default Settings;
