import React from 'react';
import { AppBar, styled, Toolbar, Typography, Box } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '40px',
  padding: '0 20px',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
  },
}));

const IconStyles = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: 'inherit',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));




export const Navbar = ({adminToken}) => {
  const isLoggedIn = !!adminToken;
  
  return (
    <AppBar position="sticky" component="div" sx={{ width: '100%', position:'fixed' }}>
      <StyledToolbar>
        <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Jay Info-Tech
        </Typography>
        <AcUnitIcon sx={{ display: { xs: 'block', sm: 'none' }, fontSize: 40 }} />

        <StyledLink to="/Home" aria-label="Home">
          <IconStyles>
            <HomeIcon fontSize="small" />
            <Typography className="icon-name">Home</Typography>
          </IconStyles>
        </StyledLink>

        {isLoggedIn? <>
          <StyledLink to="/addBill" aria-label="Add Bill">
          <IconStyles>
            <AddIcon fontSize="small" />
            <Typography className="icon-name">Add Bill</Typography>
          </IconStyles>
        </StyledLink>

        <StyledLink to="/profile" aria-label="Profile">
          <IconStyles>
            <AccountCircleIcon fontSize="small" />
            <Typography className="icon-name">Profile</Typography>
          </IconStyles>
        </StyledLink>
        </> : 
        <>
          <StyledLink to="/login" aria-label="Sign In">
          <IconStyles>
            <LoginIcon fontSize="small" />
            <Typography className="icon-name">Sign In</Typography>
          </IconStyles>
        </StyledLink>
        </>}  
      </StyledToolbar>
    </AppBar>
  );
};
