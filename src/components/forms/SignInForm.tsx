/* eslint-disable react/no-unescaped-entities */
import { Alert, Container, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { ErrorMessage, SignInData } from '../../utils/types';
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
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
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
 * Sign In Form
 */
const SignInForm: React.FC = (): JSX.Element => {
  const { handleSubmit, control } = useForm<SignInData>();

  const { signIn } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<SignInData> = async (data: SignInData) => {
    setIsLoading(true);
    setError(null);
    return await signIn(data).then((response) => {
      setIsLoading(false);

      if (response.error) {
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
        </Grid>
        <SubmitButton title="Sign in" type="submit" isLoading={isLoading} />
        <Grid container>
          <Grid>
            Don't have an account?
            <span className={classes.signin}>
              <Link href="/sign-up"> Sign up</Link>
            </span>
          </Grid>
        </Grid>
        {error?.message && (
          <Grid item xs={12}>
            Forgot your password?
            <span className={classes.signin}>
              <Link href="/reset-password"> Reset password</Link>
            </span>
          </Grid>
        )}
      </form>
    </Container>
  );
};
export default SignInForm;
