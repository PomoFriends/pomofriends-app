import {
  Container,
  Grid,
  Paper,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Layout from '../components/elements/Layout';
import Spinner from '../components/images/Spinner';
import AboutYouSettingsForm from '../components/settings/AboutYouSettingsForm';
import { useRequireAuth } from '../hooks/useRequireAuth';

const useStyles = makeStyles((theme: any) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  aboutYou: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
  },
  pomodoro: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    minHeight: '20rem',
  },
  account: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    height: '20rem',
    minHeight: '20rem',
  },
}));

/**
 *
 * @return {JSX.Element}
 *
 * Settings page
 */
const SettingsPage: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const { user } = useRequireAuth();

  return (
    <Layout>
      <>
        {!user ? (
          <Box className="flex justify-center py-8">
            <Spinner width="40" className="animate-spin" />
          </Box>
        ) : (
          <Container className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.aboutYou} elevation={3}>
                  <Typography p={2} variant="h6">
                    About you
                  </Typography>
                  <Divider />
                  <AboutYouSettingsForm user={user!} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </>
    </Layout>
  );
};

export default SettingsPage;
