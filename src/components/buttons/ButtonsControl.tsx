import { Button } from './ButtonPomodoro';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { playNotification } from '../../utils/playNotification';

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
  toggleTimeCounting: () => void;
  resetTimer: () => void;
  skipCurrent: () => void;
  startTimer: () => void;
  timeCounting: boolean;
  started: boolean;
  admin: boolean;
}

const ButtonsControl: React.FC<ButtonsProps> = ({
  toggleTimeCounting,
  resetTimer,
  skipCurrent,
  startTimer,
  timeCounting,
  started,
  admin,
}) => {
  const classes = useStyles();
  const sound = { soundOn: true, volume: 30, soundtrack: 5 };

  if (!admin) {
    return null;
  }
  return (
    <Box className={classes.box}>
      {started ? (
        <Button
          text={<RestartAltIcon />}
          color="secondary"
          className={classes.buttons}
          onClick={() => {
            resetTimer();
            playNotification(sound);
          }}
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
            toggleTimeCounting();
          }
          playNotification(sound);
        }}
      />
      {started ? (
        <Button
          text={<SkipNextIcon />}
          color="secondary"
          className={classes.buttons}
          onClick={() => {
            skipCurrent();
            playNotification(sound);
          }}
        />
      ) : null}
    </Box>
  );
};

export default ButtonsControl;
