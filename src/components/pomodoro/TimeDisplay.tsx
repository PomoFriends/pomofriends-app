import {
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { extraDigit, formatTime } from '../../utils/formatTime';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme: any) => ({
  timer: {
    height: 'full',
    verticalAlign: 'middle',
    color: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      fontSize: '6rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '6rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7.2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '7.2rem',
    },
  },
  pomodoro: {
    borderRadius: 8,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.primary.main,
  },
  shortBreak: {
    borderRadius: 8,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
  },
  longBreak: {
    borderRadius: 8,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
  },
  addGroup: {
    backgroundColor: theme.palette.secondary.main,
  },
  settingsBox: {
    marginLeft: '1.5rem',
    marginTop: '0.7rem',
    position: 'absolute',
  },
}));

interface TimerProps {
  time: number;
  isBreak: boolean;
  isLongBreak: boolean;
}

const TimeDisplay: React.FC<TimerProps> = ({ time, isBreak, isLongBreak }) => {
  const classes = useStyles();
  const convertedTime = formatTime(time, false);

  return (
    <>
      <Box className={classes.settingsBox}>
        <Tooltip title="Settings">
          <IconButton edge="start" aria-label="add-group">
            <Avatar className={classes.addGroup}>
              <SettingsIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        className={
          !isBreak
            ? classes.pomodoro
            : isLongBreak
            ? classes.longBreak
            : classes.shortBreak
        }
        elevation={3}
      >
        <Typography align="center" className={classes.timer}>
          {extraDigit(convertedTime.minutes)}:
          {extraDigit(convertedTime.seconds)}
        </Typography>
      </Paper>
    </>
  );
};

export default TimeDisplay;
