import GroupsIcon from '@mui/icons-material/Groups';
import TimerIcon from '@mui/icons-material/Timer';
import {
  Container,
  Fab,
  Fade,
  Grid,
  Paper,
  SxProps,
  Tooltip,
  Zoom,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../components/elements/Layout';
import Group from '../components/group/Group';
import GroupList from '../components/group/List';
import Pomodoro from '../components/pomodoro/Pomodoro';
import AdminPomodoro from '../components/pomodoro/AdminPomodoro';
import GroupPomodoro from '../components/pomodoro/GroupPomodoro';
import Tasks from '../components/tasks/Tasks';
import { useAuth } from '../hooks/useAuth';
import { useGroup } from '../hooks/useGroup';

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
    height: '20rem',
  },
  paperGroup: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 4,
    borderRadius: 8,
    height: '41rem',
    minHeight: '41rem',
  },

  closedContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: '34rem',
    padding: 0,
  },

  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}));

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

/**
 *
 * @return {JSX.Element}
 *
 * Landing page
 */
const HomePage: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const { user } = useAuth();
  const { getAdmin } = useGroup();

  const [groupId, setGroupId] = useState<null | undefined | string>(null);
  const [adminId, setAdminId] = useState<string>('');

  // automatically check db for new admin
  useEffect(() => {
    let isSubscribed = true;

    if (groupId) getAdmin(groupId, setAdminId, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, [groupId]);

  const [groupOpen, setGroupOpen] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(true);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <GroupsIcon />,
      label: 'Show Group',
    },
    {
      color: 'secondary' as 'secondary',
      sx: fabStyle as SxProps,
      icon: <TimerIcon />,
      label: 'Hide Group',
    },
  ];

  useEffect(() => {
    setGroupId(user?.groupId);
  }, [user]);

  const handleChange = () => {
    if (groupOpen === 0) setGroupOpen(1);
    else setGroupOpen(0);

    setOpen(!open);
  };

  let body = null;
  let pomodoroType = null;

  if (groupId && user) {
    if (adminId === user.id) {
      pomodoroType = <AdminPomodoro groupId={groupId} />;
    } else {
      pomodoroType = <GroupPomodoro groupId={groupId} adminId={adminId} />;
    }
  } else {
    pomodoroType = <Pomodoro />;
  }

  if (groupOpen === 1) {
    body = (
      <Fade
        in={open}
        style={{
          transitionDelay: `${open ? transitionDuration.exit : 0}ms`,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paperPomodoro} elevation={3}>
                  {pomodoroType}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paperTasks} elevation={3}>
                  <Tasks />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paperGroup} elevation={3}>
              {groupId ? <Group id={groupId} /> : <GroupList />}
            </Paper>
          </Grid>
        </Grid>
      </Fade>
    );
  } else {
    body = (
      <Container className={classes.closedContainer}>
        <Fade
          in={!open}
          style={{
            transitionDelay: `${!open ? transitionDuration.exit : 0}ms`,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paperPomodoro} elevation={3}>
                {pomodoroType}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperTasks} elevation={3}>
                <Tasks />
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    );
  }

  return (
    <Layout>
      <Container className={classes.container}>
        <>{body}</>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={groupOpen === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${
                groupOpen === index ? transitionDuration.exit : 0
              }ms`,
            }}
            unmountOnExit
          >
            <Tooltip title={fab.label}>
              <Fab
                className={classes.fab}
                sx={fab.sx}
                aria-label={fab.label}
                color={fab.color}
                onClick={handleChange}
              >
                {fab.icon}
              </Fab>
            </Tooltip>
          </Zoom>
        ))}
      </Container>
    </Layout>
  );
};

export default HomePage;
