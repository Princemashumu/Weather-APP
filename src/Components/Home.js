import React, { useState } from 'react';
import axios from 'axios';
import BgImg from '../assets/BgImg.jpg'; // Adjust the path based on your project structure
import { Typography, Container, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Snackbar, Alert, Checkbox, FormControlLabel, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false); // State for privacy policy dialog
  const [openTermsConditions, setOpenTermsConditions] = useState(false); // State for terms & conditions dialog
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenPrivacyPolicy = () => setOpenPrivacyPolicy(true);
  const handleClosePrivacyPolicy = () => setOpenPrivacyPolicy(false);

  const handleOpenTermsConditions = () => setOpenTermsConditions(true);
  const handleCloseTermsConditions = () => setOpenTermsConditions(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleRegisterSubmit = async () => {
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setSnackbarMessage('All fields are required');
      setSnackbarOpen(true);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarOpen(true);
      return;
    }

    if (!termsAccepted) {
      setSnackbarMessage('You must accept the terms & conditions and privacy policy');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      console.log('User registered:', response.data);
      setSnackbarMessage('User registered successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenRegister(false);
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarMessage('Error registering user');
      setSnackbarOpen(true);
    }
  };

  const handleLoginSubmit = async () => {
    if (!loginData.email || !loginData.password) {
      setSnackbarMessage('All fields are required');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { email: loginData.email, password: loginData.password },
      });

      const user = response.data.find(
        (user) => user.email === loginData.email && user.password === loginData.password
      );

      if (user) {
        setSnackbarMessage('Login successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setOpenLogin(false);
        navigate('/landing');  //navigate to the next page after login successfully
      } else {
        setSnackbarMessage('Invalid email or password');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarMessage('Error logging in');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '100%',
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderRadius: '25px',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" component="p" gutterBottom fontSize={'xxx-large'}>
          Geo Weather Forecast.
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

      <Dialog open={openRegister} onClose={handleCloseRegister} PaperProps={{ sx: { backgroundColor: 'rgba(155, 155, 155, 0)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '50px', color: 'white' } }}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="username" label="Username" type="text" fullWidth variant="outlined" value={registerData.username} onChange={handleRegisterChange} />
          <TextField margin="dense" name="email" label="Email Address" type="email" fullWidth variant="outlined" value={registerData.email} onChange={handleRegisterChange} />
          <TextField margin="dense" name="password" label="Password" type="password" fullWidth variant="outlined" value={registerData.password} onChange={handleRegisterChange} />
          <TextField margin="dense" name="confirmPassword" label="Confirm Password" type="password" fullWidth variant="outlined" value={registerData.confirmPassword} onChange={handleRegisterChange} />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={handleTermsChange}
                color="primary"
              />
            }
            label={
              <Typography component="span">
                I agree to the{' '}
                <Link component="button" onClick={handleOpenPrivacyPolicy} color="inherit">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link component="button" onClick={handleOpenTermsConditions} color="inherit">
                  Terms & Conditions
                </Link>
              </Typography>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="primary">Cancel</Button>
          <Button onClick={handleRegisterSubmit} color="primary">Register</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPrivacyPolicy} onClose={handleClosePrivacyPolicy} PaperProps={{ sx: { backgroundColor: 'rgba(155, 155, 155, 0)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '50px', color: 'white' } }}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="p">
            This Privacy Policy explains how we handle your personal information and complies with the Protection of Personal Information Act (POPI Act). We collect location data to provide you with personalized weather forecasts. Your data is stored securely and is only used for the intended purpose of improving your experience on our platform.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacyPolicy} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTermsConditions} onClose={handleCloseTermsConditions} PaperProps={{ sx: { backgroundColor: 'rgba(155, 155, 155, 0)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '50px', color: 'white' } }}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="p">
            By using this app, you agree to our Terms & Conditions. The use of our app is subject to these terms, which include your responsibilities and the limitations of our liability. Please read these terms carefully. If you do not agree with any part of these terms, do not use the app.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsConditions} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogin} onClose={handleCloseLogin} PaperProps={{ sx: { backgroundColor: 'rgba(155, 155, 155, 0)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '50px', color: 'white' } }}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="email" label="Email Address" type="email" fullWidth variant="outlined" value={loginData.email} onChange={handleLoginChange} />
          <TextField margin="dense" name="password" label="Password" type="password" fullWidth variant="outlined" value={loginData.password} onChange={handleLoginChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin} color="primary">Cancel</Button>
          <Button onClick={handleLoginSubmit} color="primary">Login</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
