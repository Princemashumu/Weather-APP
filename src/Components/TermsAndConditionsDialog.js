import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const TermsAndConditionsDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="terms-and-conditions-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#2e2e2e', // Background color for the dialog
          borderRadius: '15px', // Rounded corners
          padding: '20px', // Extra padding
          boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)', // Custom shadow
        }
      }}
    >
      <DialogTitle 
        id="terms-and-conditions-dialog-title"
        sx={{ 
          color: '#ffffff', // Title text color
          fontSize: '1.5rem', // Increase font size
          fontWeight: 'bold', // Bold font
        }}
      >
        Terms and Conditions
      </DialogTitle>
      <DialogContent>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#b0b0b0', // Body text color
            fontSize: '1rem', // Increase font size for body
          }}
        >
          By using this app, you consent to our use of your location to provide accurate weather information.
          We use the location data to deliver weather forecasts tailored to your current area.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#b0b0b0', // Body text color
            fontSize: '1rem', // Increase font size for body
            marginTop: '15px', // Margin for spacing
          }}
        >
          Our app utilizes an external weather API to fetch data. The API is used solely to provide weather-related information and is not used for any other purpose.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: '#4caf50', // Button color
            border: '1px solid #4caf50', // Button border
            '&:hover': {
              backgroundColor: '#4caf50', // Hover background color
              color: '#ffffff', // Hover text color
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
