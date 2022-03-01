import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  ErrorMessage,
  AboutYouSettingsForm as Form,
  UserData,
} from '../../utils/types';
import { Container, Grid, Alert, TextField } from '@mui/material';
import SubmitButton from '../buttons/SubmitButton';
import { makeStyles } from '@mui/styles';
import { useSettings } from '../../hooks/useSettings';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    minHeight: '3.2rem',
    height: '3.2rem',
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

interface AboutYouSettingsFormProps {
  user: UserData;
}

const AboutYouSettingsForm: React.FC<AboutYouSettingsFormProps> = ({
  user,
}) => {
  const classes = useStyles();

  const { updateAboutYou } = useSettings();

  const { handleSubmit, control } = useForm<Form>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    setIsLoading(true);
    setError(null);
    return await updateAboutYou(data).then(() => {
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
              name="username"
              control={control}
              defaultValue={user.username}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className={classes.textField}
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  autoComplete="username"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Username required',
                minLength: {
                  value: 3,
                  message: 'Should have at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Should have should be less than 20 characters',
                },
              }}
            />
          </Grid>
        </Grid>
        <SubmitButton
          title="Submit changes"
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </Container>
  );
};

export default AboutYouSettingsForm;
