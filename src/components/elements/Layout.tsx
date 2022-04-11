import { Box, Container } from '@mui/material';
import Footer from './Footer';
import Navbar from './NavBar';
import Head from 'next/head';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon-16x16.png`}
        />
      </Head>
      <Box>
        <Navbar />
        <Container component="main" maxWidth="lg">
          <Box mb={8}>{children}</Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
