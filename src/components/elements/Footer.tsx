import { UnstyledButton } from '@mantine/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PollIcon from '@mui/icons-material/Poll';
import { Box, Container, Typography, Divider, Grid } from '@mui/material';

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
          <Typography variant="body1" mb={2}>
            Build with <FavoriteIcon color="primary" fontSize="small" /> by
            PomoFriends Team
          </Typography>
        </Container>
        <Divider />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={4}>
            <UnstyledButton>
              <a
                target="_blank"
                href="https://github.com/PomoFriends/pomofriends-app"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <GitHubIcon color="primary" />
                  <Typography component={'span'} color="white" ml={0.5}>
                    GitHub
                  </Typography>
                </Box>
              </a>
            </UnstyledButton>
          </Grid>
          <Grid item xs={4}>
            <UnstyledButton>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/vadimegorov13/"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <LinkedInIcon color="primary" />
                  <Typography component={'span'} color="white" ml={0.5}>
                    LinkedIn
                  </Typography>
                </Box>
              </a>
            </UnstyledButton>
          </Grid>
          <Grid item xs={4}>
            <UnstyledButton>
              <a
                target="_blank"
                href="https://forms.gle/C3UHejiw4H4BgYi89"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <PollIcon color="primary" />
                  <Typography component={'span'} color="white" ml={0.5}>
                    Survey
                  </Typography>
                </Box>
              </a>
            </UnstyledButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
