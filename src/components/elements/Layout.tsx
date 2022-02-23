import { Box, Container } from '@mui/material';
import React from 'react';
import Navbar from './NavBar';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box>{children}</Box>
      </Container>
    </Box>
  );
};

export default Layout;
