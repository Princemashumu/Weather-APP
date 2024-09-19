import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';

const SettingsDialog = ({ open, onClose, onUnitChange }) => {
  const [unit, setUnit] = useState('metric'); // Default to Celsius

  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
    setUnit(newUnit);
    onUnitChange(newUnit);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Temperature Unit
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={unit}
            onChange={handleUnitChange}
            row
          >
            <FormControlLabel value="metric" control={<Radio />} label="Celsius" />
            <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
