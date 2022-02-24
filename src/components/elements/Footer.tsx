import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Box component="footer">
        <Container maxWidth="sm">
          <Typography variant="body1">Build with 💜 by Vadim Egorov</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
