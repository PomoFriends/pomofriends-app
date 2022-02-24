import { Box, Container } from '@mui/material';
import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box mb={8}>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
