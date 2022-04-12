import {
  Alert,
  Container,
  Grid,
  Input,
  Switch,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSettings } from '../../hooks/useSettings';
import { playNotification } from '../../utils/playNotification';
import { ErrorMessage } from '../../utils/types/formTypes';
import { NotificationSettings } from '../../utils/types/userTypes';
import SubmitButton from '../buttons/SubmitButton';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    minHeight: '3.2rem',
    height: '3.2rem',
  },
}));

interface NotificationsFormProps {
  settings: NotificationSettings;
}

const NotificationsForm: React.FC<NotificationsFormProps> = ({ settings }) => {
  const classes = useStyles();

  const { updateNotificationSettings } = useSettings();

  const { handleSubmit, control } = useForm<NotificationSettings>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [volume, setVolume] = useState<number>(settings.volume);

  const handleAlarmSound = (event: SelectChangeEvent) => {
    playNotification({
      soundOn: true,
      volume: volume,
      soundtrack: parseInt(event.target.value),
    });
  };

  const handleVolume = (event: any) => {
    setVolume(parseInt(event.target.value));
  };

  const onSubmit: SubmitHandler<NotificationSettings> = async (
    data: NotificationSettings
  ) => {
    setIsLoading(true);
    setError(null);
    return await updateNotificationSettings(data).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container spacing={2}>
          {error?.message && (
            <Grid item xs={12}>
              <Alert severity="error" variant="filled">
                {error.message}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Controller
              name="soundOn"
              control={control}
              defaultValue={settings.soundOn}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6} mt={1}>
                    <Typography>Alarm on?</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Switch
                      onChange={(e) => onChange(e.target.checked)}
                      checked={value}
                    />
                  </Grid>
                </Grid>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="volume"
              control={control}
              defaultValue={settings.volume}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6} mt={1}>
                    <Typography>Volume</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Input
                      value={value}
                      size="small"
                      onChange={(e) => {
                        onChange(e);
                        handleVolume(e);
                      }}
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 100,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="soundtrack"
              control={control}
              defaultValue={settings.soundtrack}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6} mt={1}>
                    <Typography>Alarm Sound</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Select
                      value={value}
                      onChange={(e: any) => {
                        onChange(e);
                        handleAlarmSound(e);
                      }}
                      sx={{ height: '2rem' }}
                    >
                      <MenuItem value={0}>Soft Bells</MenuItem>
                      <MenuItem value={1}>Demonstrative</MenuItem>
                      <MenuItem value={2}>Eventually</MenuItem>
                      <MenuItem value={3}>Goes Without Saying</MenuItem>
                      <MenuItem value={4}>Got It Done</MenuItem>
                      <MenuItem value={5}>Juntos</MenuItem>
                      <MenuItem value={6}>Long Chime</MenuItem>
                      <MenuItem value={7}>Piece Of Cake</MenuItem>
                      <MenuItem value={8}>Pristine</MenuItem>
                      <MenuItem value={9}>Slow Spring Board</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              )}
            />
          </Grid>
        </Grid>
        <SubmitButton
          title="Update Settings"
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </Container>
  );
};

export default NotificationsForm;
