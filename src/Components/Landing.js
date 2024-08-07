// src/components/Landing.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Landing = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        background: 'linear-gradient(to bottom, #87CEFA, #f5f5f5)', // Sky blue to white gradient
        textAlign: 'center',
        color: '#333',
        padding: '20px',
        boxSizing: 'border-box',
        overflow:'hidden',
        borderRadius:'25px',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Landing Page
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Welcome to the Landing Page!
      </Typography>
    </Box>
  );
};

export default Landing;
