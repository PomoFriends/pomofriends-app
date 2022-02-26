import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useGroup } from '../../hooks/useGroup';
import { ErrorMessage, GroupForm as Form } from '../../utils/types';
import { Container, Grid, Alert, TextField } from '@mui/material';
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
}));

const GroupForm: React.FC = () => {
  const classes = useStyles();
  const { createGroup } = useGroup();

  const { handleSubmit, control } = useForm<Form>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    setIsLoading(true);
    setError(null);
    return await createGroup(data).then((response) => {
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
              name="name"
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
                  id="group name"
                  name="group name"
                  label="Group Name"
                  autoComplete="group name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Group Name required',
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
                  required
                  fullWidth
                  multiline
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoComplete="current-description"
                />
              )}
              rules={{
                required: 'Description required',
              }}
            />
          </Grid>
        </Grid>
        <SubmitButton
          title="Create a Group"
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </Container>
  );
};

export default GroupForm;
