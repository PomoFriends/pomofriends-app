import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Layout from '../components/elements/Layout';
import Spinner from '../components/images/Spinner';
import AboutYouSettingsForm from '../components/settings/AboutYouSettingsForm';
import PomodoroSettingsForm from '../components/settings/PomodoroSettingsForm';
import { db } from '../firebase/firebase';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { PomodoroSettings } from '../utils/types/userTypes';

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
  const [pomodoroSettings, setSettings] = useState<PomodoroSettings | null>(
    null
  );

  const fetchPomodoro = async () => {
    await db
      .collection('pomodoroSettings')
      .doc(user?.id)
      .get()
      .then((settings) => {
        if (settings.exists) {
          setSettings(settings.data() as PomodoroSettings);
        } else {
          console.log('No such document!');
        }
      });
  };
  fetchPomodoro();

  return (
    <Layout>
      <>
        {!user || !pomodoroSettings ? (
          <Box>
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
