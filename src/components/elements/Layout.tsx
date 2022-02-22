import { Box } from '@mui/material';
import React from 'react';
import Navbar from './NavBar';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
