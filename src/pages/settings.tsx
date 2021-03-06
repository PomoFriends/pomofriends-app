import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../components/elements/Layout';
import Loader from '../components/elements/Loader';
import AboutYouSettingsForm from '../components/settings/AboutYouSettingsForm';
import PomodoroSettingsForm from '../components/settings/PomodoroSettingsForm';
import VisibilitySettingsForm from '../components/settings/VisibilitySettings';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useSettings } from '../hooks/useSettings';
import { PomodoroSettings, UserSettings } from '../utils/types/userTypes';

const useStyles = makeStyles((theme: any) => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: '34rem',
    padding: 0,
  },
  closedContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: '34rem',
    padding: 0,
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
  const { getSettings, getVisibilitySettings } = useSettings();
  const [pomodoroSettings, setSettings] = useState<PomodoroSettings | null>(
    null
  );

  const [visSettings, setVisSettings] = useState<UserSettings | null>(null);

  // Automatically check db for updated settings
  useEffect(() => {
    let isSubscribed = true;

    // Get user settings
    if (user) {
      getSettings(user.id, setSettings, isSubscribed);
      getVisibilitySettings(user.id, setVisSettings, isSubscribed);
    }

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  return (
    <Layout>
      <>
        {!user || !pomodoroSettings || !visSettings ? (
          <Box my={45}>
            <Loader />
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
              <Grid item xs={12}>
                <Paper className={classes.aboutYou} elevation={3}>
                  <Typography p={2} variant="h6">
                    Visibility Settings
                  </Typography>
                  <Divider />
                  <VisibilitySettingsForm settings={visSettings!} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.pomodoro} elevation={3}>
                  <Typography p={2} variant="h6">
                    Pomodoro Settings
                  </Typography>
                  <Divider />
                  <PomodoroSettingsForm settings={pomodoroSettings!} />
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
