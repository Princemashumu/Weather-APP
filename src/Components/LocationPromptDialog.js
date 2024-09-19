import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Link } from '@mui/material';
import TermsAndConditionsDialog from './TermsAndConditionsDialog'; // Import the TermsAndConditionsDialog component

const LocationPromptDialog = ({ open, onClose, onAllow, onDeny }) => {
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  const handleOpenTermsDialog = () => {
    setTermsDialogOpen(true);
  };

  const handleCloseTermsDialog = () => {
    setTermsDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="location-prompt-dialog-title"
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
          id="location-prompt-dialog-title"
          sx={{ 
            color: '#ffffff', // Title text color
            fontSize: '1.5rem', // Increase font size
            fontWeight: 'bold', // Bold font
            paddingBottom: '10px' // Space between title and content
          }}
        >
          Location Access Required
        </DialogTitle>
        <DialogContent>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#b0b0b0', // Body text color
              fontSize: '1rem', // Increase font size for body
            }}
          >
            This app requires access to your current location to provide accurate weather information. 
            Please allow access to your location.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#b0b0b0', // Text color
              marginTop: '15px' // Margin between the text and terms link
            }}
          >
            By allowing access, you agree to our 
            {' '}
            <Link 
              href="#" 
              underline="hover" 
              sx={{ color: '#4caf50' }} // Link color
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleOpenTermsDialog(); // Open terms and conditions dialog
              }}
            >
              Terms and Conditions
            </Link>.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button 
            onClick={onDeny} 
            sx={{ 
              color: '#ff4c4c', // Button color
              border: '1px solid #ff4c4c', // Button border
              '&:hover': {
                backgroundColor: '#ff4c4c', // Hover background color
                color: '#ffffff', // Hover text color
              }
            }}
          >
            Deny
          </Button>
          <Button 
            onClick={onAllow} 
            sx={{ 
              color: '#4caf50', // Button color
              border: '1px solid #4caf50', // Button border
              '&:hover': {
                backgroundColor: '#4caf50', // Hover background color
                color: '#ffffff', // Hover text color
              }
            }}
          >
            Allow
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms and Conditions Dialog */}
      <TermsAndConditionsDialog 
        open={termsDialogOpen} 
        onClose={handleCloseTermsDialog} 
      />
    </>
  );
};

export default LocationPromptDialog;
