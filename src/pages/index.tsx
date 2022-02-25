import React from 'react';
import Layout from '../components/elements/Layout';
import Pomodoro from '../components/pomodoro/Pomodoro';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Paper } from '@mui/material';
import GroupList from '../components/group/List';

const useStyles = makeStyles((theme: any) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  paperPomodoro: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    height: '20rem',
    minHeight: '20rem',
  },
  paperTasks: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    minHeight: '20rem',
  },
  paperGroup: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    height: '41rem',
    minHeight: '41rem',
  },
}));

/**
 *
 * @return {JSX.Element}
 *
 * Landing page
 */
const HomePage: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paperPomodoro} elevation={3}>
                  <Pomodoro />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paperTasks} elevation={3}>
                  Tasks
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5} md={4}>
            <Paper className={classes.paperGroup} elevation={3}>
              <GroupList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomePage;
