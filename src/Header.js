import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="static" sx={{ borderRadius: '12px' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Math-profi
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;