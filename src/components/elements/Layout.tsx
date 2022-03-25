import { Box, Container } from '@mui/material';
import Footer from './Footer';
import Navbar from './NavBar';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Box mb={8}>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
