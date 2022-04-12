import { Container, Grid, Input, Switch, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PomodoroSettings } from '../../utils/types/userTypes';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  input: {
    minHeight: '3.2rem',
    height: '3.2rem',
  },
}));

interface PomodoroSettingsFormProps {
  settings: PomodoroSettings;
}

const PomodoroSettingsForm: React.FC<PomodoroSettingsFormProps> = ({
  settings,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} className={classes.form}>
        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6} mt={1}>
              <Typography>Pomodoro</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Box sx={{ width: '3rem' }}>
                <Input value={settings.pomodoro / 60} size="small" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6} mt={1}>
              <Typography>Short Break</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Box sx={{ width: '3rem' }}>
                <Input value={settings.shortBreak / 60} size="small" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6} mt={1}>
              <Typography>Long Break</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Box sx={{ width: '3rem' }}>
                <Input value={settings.longBreak / 60} size="small" />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6} mt={1}>
              <Typography>Long Break Interval</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Box sx={{ width: '3rem' }}>
                <Input value={settings.longBreakInterval} size="small" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6} mt={1}>
              <Typography>Auto Start Pomodoro</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Switch checked={settings.autoStartPomodoro} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Grid container spacing={2} className={classes.input}>
            <Grid item xs={6}>
              <Typography>Auto Start Break</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Switch checked={settings.autoStartBreak} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PomodoroSettingsForm;
