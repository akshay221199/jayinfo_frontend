import React, { useState } from 'react';
import { Container, Card, Typography, Box, TextField, Button, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [error, setError] = useState(null); // To display errors
  const [loading, setLoading] = useState(false); // To handle loading state
  const [success, setSuccess] = useState(false); // To show success message

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('${BASE_URL}/api/v1/admin/loginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
     const token = data.authtoken
     
      // Function to set a cookie
      function setCookie(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // Default 7 days expiry
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
      }

      
      // Usage: setting a cookie
      setCookie('adminToken', token);

      setSuccess(true); // Set success state
      navigate('/Home')
      console.log('Login successful:', data);

      // You can redirect the user or perform other actions
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ padding: 3, marginTop: 4, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login  
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Login successful!</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            id="emailId"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            id="passId"
            fullWidth
            required
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, padding: 1, width: '100%' }}
            type="submit"
            startIcon={<LoginIcon />}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
