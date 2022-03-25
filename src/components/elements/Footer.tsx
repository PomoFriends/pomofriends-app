import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
            Build with <FavoriteIcon color="primary" /> by PomoFriends Team
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
