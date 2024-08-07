import React, { useState } from 'react';
import BgImg from '../assets/BgImg.jpg'; // Adjust the path based on your project structure
import { Typography, Container, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const Home = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'column',
        height: '100vh',
        maxWidth:'100%',
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        // msOverflowY:'hidden',
        overflow:'hidden',
        borderRadius:'25px',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" component="p" gutterBottom fontSize={'xxx-large'}>
          Geo-Weather Service
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Welcome to our weather system
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          This app is designed to provide users with an intuitive and interactive weather experience. Explore the features and enjoy the seamless functionality offered by our platform.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={handleOpenRegister}>
            Register Account
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpenLogin}>
          Login
          </Button>
        </Box>
      </Container>



      <Dialog open={openRegister} onClose={handleCloseRegister} PaperProps={{ sx: { backgroundColor: 'rgba(255, 255, 255, 100)', backdropFilter: 'blur(100px)',borderRadius:'25px' },boxSizing:'xx-small'}}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
        <TextField autoFocus margin="dense" label="Username" type="text" fullWidth variant="outlined" />
          <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="outlined" />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" />
          <TextField margin="dense" label="Confirm Password" type="password" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="primary">Cancel</Button>
          <Button onClick={handleCloseRegister} color="primary">Register</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogin} onClose={handleCloseLogin} PaperProps={{ sx: { backgroundColor: 'rgba(255, 255, 255, 100)', backdropFilter: 'blur(100px)',borderRadius:'25px' },boxSizing:'xx-small' } }>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="outlined" />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">Cancel</Button>
          <Button onClick={handleCloseLogin} color="primary">Login</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;