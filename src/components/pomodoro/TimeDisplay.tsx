import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { extraDigit, formatTime } from '../../utils/formatTime';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '12rem',
    height: '12rem',
  },
  timer: {
    height: 'full',
    verticalAlign: 'middle',
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
}));

interface TimerProps {
  time: number;
  isBreak: boolean;
  isLongBreak: boolean;
}

const TimeDisplay: React.FC<TimerProps> = ({ time }) => {
  const classes = useStyles();
  const convertedTime = formatTime(time, false);

  return (
    <>
      <Container className={classes.paper}>
        <Typography align="center" className={classes.timer}>
          {extraDigit(convertedTime.minutes)}:
          {extraDigit(convertedTime.seconds)}
        </Typography>
      </Container>
    </>
  );
};

export default TimeDisplay;
