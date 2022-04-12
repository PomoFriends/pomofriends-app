import {
  Alert,
  Container,
  Grid,
  Switch,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Modal,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSettings } from '../../hooks/useSettings';
import {
  ErrorMessage,
  VisibilitySettingsForm as Form,
} from '../../utils/types/formTypes';
import { UserSettings } from '../../utils/types/userTypes';
import SubmitButton from '../buttons/SubmitButton';
import { ColorPicker } from '@mantine/core';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    minHeight: '3.2rem',
    height: '3.2rem',
    width: '100%',
  },
  colorModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
  },
}));

interface VisibilitySettingsFormProps {
  settings: UserSettings;
}

const VisibilitySettingsForm: React.FC<VisibilitySettingsFormProps> = ({
  settings,
}) => {
  const classes = useStyles();
  const { updateVisibilitySettings } = useSettings();

  const { handleSubmit, control } = useForm<Form>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    setIsLoading(true);
    setError(null);
    return await updateVisibilitySettings(data).then(() => {
      setIsLoading(false);
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
              name="color"
              control={control}
              defaultValue={settings.color}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Grid container spacing={2} className={classes.input}>
                    <Grid item xs={6} mt={1}>
                      <Typography>Color</Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end">
                      <Tooltip title="Change color">
                        <IconButton
                          aria-label="change color"
                          size="medium"
                          onClick={handleOpen}
                        >
                          <Avatar sx={{ bgcolor: value }}>
                            <FormatPaintIcon />
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Modal open={open} onClose={handleClose}>
                    <Grid container spacing={2} className={classes.colorModal}>
                      <Grid item xs={6}>
                        <TextField
                          required
                          fullWidth
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        justifyContent="flex-end"
                        p={2}
                      >
                        <ColorPicker value={value} onChange={onChange} />
                      </Grid>
                    </Grid>
                  </Modal>
                </>
              )}
              rules={{
                minLength: {
                  value: 7,
                  message: 'Cannot be smaller than 7 characters',
                },
                maxLength: {
                  value: 7,
                  message: 'Cannot be bigger than 7 characters',
                },
                pattern: {
                  value: /^#a?/,
                  message: 'Not a valid HEX, please include # at the start',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="tasksVisible"
              control={control}
              defaultValue={settings.tasksVisible}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6} mt={1}>
                    <Typography>Tasks are visible to other users</Typography>
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
              name="activityVisible"
              control={control}
              defaultValue={settings.activityVisible}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6} mt={1}>
                    <Typography>Activity visible to other users</Typography>
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

export default VisibilitySettingsForm;
