/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { ErrorMessage, SignUpData } from '../../utils/types';
import SubmitButton from '../buttons/SubmitButton';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signin: {
    color: theme.palette.secondary.main,
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

/**
 *
 * @return {JSX.Element}
 *
 * SignUp Form
 */
const SignUpForm: React.FC = (): JSX.Element => {
  const { handleSubmit, control } = useForm<SignUpData>();

  const { signUp } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    setIsLoading(true);
    setError(null);
    return await signUp(data).then((response) => {
      setIsLoading(false);
      if (response.error) {
        console.log(response.error);
        setError(getErrorMessage(response.error));
      } else {
        router.push('/dashboard');
      }
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
              defaultValue=""
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
          <Grid item xs={12}>
            <Controller
              name="email"
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
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: 'Email required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Not a valid email',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoComplete="current-password"
                />
              )}
              rules={{
                required: 'Password required',
                minLength: {
                  value: 6,
                  message: 'Should have at least 6 characters',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates and marketing promotions via email."
            />
          </Grid>
        </Grid>
        <SubmitButton title="Sign up" type="submit" isLoading={isLoading} />
        <Grid container>
          <Grid>
            Already have an account?
            <span className={classes.signin}>
              <Link href="/sign-in"> Sign in</Link>
            </span>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default SignUpForm;
