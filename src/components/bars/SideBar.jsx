import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import Home from '@mui/icons-material/Home';
import { Settings } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from 'react-router-dom';


const StyledLink = styled(Link)(({theme})=>({
    textDecoration:'none',
    color:'inherit'
}));


export const SideBar = ({adminToken}) => {
  const isLoggedIn = !!adminToken;
     
  
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none",marginLeft:'-19px', sm: "block",width:'250px',bgcolor:'red', marginTop:'3rem' },  }} // Set background to light gray
    >
      <Box position="fixed" sx={{bgcolor: '#f0f0f0', height: '100vh'}}>
        <List>
          <ListItem disablePadding>
              <StyledLink to='/Home'>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
              </StyledLink>
          </ListItem>

          <ListItem disablePadding>
            <StyledLink to='/service' >
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Service" />
            </ListItemButton>
            </StyledLink>
          </ListItem>

          {isLoggedIn ? <>
            <ListItem disablePadding>
            <StyledLink to='/dashboard'>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            </StyledLink>
          </ListItem>

          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
          </> : <>
          </>}
          
        </List>
      </Box>
    </Box>
  );
};
