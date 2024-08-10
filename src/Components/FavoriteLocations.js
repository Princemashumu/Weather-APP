
// import React from 'react';
import { MenuItem, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FavoriteLocations = ({ locations, onSelect }) => {
  return (
    <>
      <MenuItem disabled>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Saved Locations
        </Typography>
      </MenuItem>
      {locations.map((location, index) => (
        <MenuItem key={index} onClick={() => onSelect(location)}>
          <LocationOnIcon sx={{ mr: 1 }} />
          {location}
        </MenuItem>
      ))}
    </>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
};
export default FavoriteLocations;