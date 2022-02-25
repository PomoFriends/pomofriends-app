import React from 'react';
import { Button } from './ButtonPomodoro';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: any) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    marginRight: 2,
    marginLeft: 2,
  },
}));

interface ButtonsProps {
  setTimeCounting: (boolean: boolean) => void;
  resetTimer: () => void;
  skipCurrent: () => void;
  startTimer: () => void;
  timeCounting: boolean;
  started: boolean;
}

const ButtonsControl: React.FC<ButtonsProps> = ({
  setTimeCounting,
  resetTimer,
  skipCurrent,
  startTimer,
  timeCounting,
  started,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      {started ? (
        <Button
          text={<RestartAltIcon />}
          color="secondary"
          className={classes.buttons}
          onClick={() => resetTimer()}
        />
      ) : null}

      <Button
        text={
          !started ? (
            <PlayArrowIcon />
          ) : timeCounting ? (
            <StopIcon />
          ) : (
            <PlayArrowIcon />
          )
        }
        color="primary"
        className={classes.buttons}
        onClick={() => {
          if (!started) {
            startTimer();
          } else {
            setTimeCounting(!timeCounting);
          }
        }}
      />
      {started ? (
        <Button
          text={<SkipNextIcon />}
          color="secondary"
          className={classes.buttons}
          onClick={() => skipCurrent()}
        />
      ) : null}
    </Box>
  );
};

export default ButtonsControl;
