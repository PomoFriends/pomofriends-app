import { Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { extraDigit, formatTime } from '../../utils/formatTime';

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
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.primary.main,
  },
  shortBreak: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
  },
  longBreak: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
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
