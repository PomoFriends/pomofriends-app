import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTasks } from '../../hooks/useTasks';
import { ErrorMessage, TaskForm as Form } from '../../utils/types';
import {
  Container,
  Grid,
  Alert,
  TextField,
  Input,
  Typography,
  Button,
} from '@mui/material';
import SubmitButton from '../buttons/SubmitButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.disabled,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  input: {
    minHeight: '3.2rem',
    height: '3.2rem',
    width: '100%',
  },
  cancelButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface TaskFormProps {
  handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose }) => {
  const classes = useStyles();

  const { createTask } = useTasks();

  const { handleSubmit, control } = useForm<Form>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    handleClose();
    setIsLoading(true);
    setError(null);
    return await createTask(data).then((response) => {
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
              name="title"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.textField}
                  required
                  fullWidth
                  label="Task Title"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Task Name required',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.textField}
                  fullWidth
                  multiline
                  label="Description"
                  type="text"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="pomodorosTotal"
              control={control}
              defaultValue={1}
              render={({ field: { onChange, value } }) => (
                <Grid container spacing={2} className={classes.input}>
                  <Grid item xs={6}>
                    <Typography># of Pomodoros</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Input
                      value={value}
                      size="medium"
                      onChange={onChange}
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
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              className={classes.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <SubmitButton
              title="Create Task"
              type="submit"
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;
