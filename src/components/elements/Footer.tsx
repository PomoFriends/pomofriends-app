import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 2,
      }}
    >
      <Box component="footer">
        <Container maxWidth="sm">
          <Typography variant="body1">
            Build with <FavoriteIcon color="primary" /> by Vadim Egorov
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
