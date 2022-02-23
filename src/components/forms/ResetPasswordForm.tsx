import { useRouter } from 'next/router';
import { ResetPasswordData } from '../../utils/types';
import { useAuth } from '../../hooks/useAuth';
import { Container, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
 * Form for resetting a password
 */
const ResetPasswordForm: React.FC = (): JSX.Element => {
  const { handleSubmit, control } = useForm<ResetPasswordData>();

  const { sendPasswordResetEmail } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    sendPasswordResetEmail(data.email);
    router.push('/sign-in');
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container spacing={2}>
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
        </Grid>
        <SubmitButton
          title="Send reset link"
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </Container>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="rounded-md">
    //     <label
    //       htmlFor="email"
    //       className="block text-sm font-medium leading-5 text-gray-700"
    //     >
    //       Email address
    //     </label>
    //     <div className="mt-1 rounded-md">
    //       <input
    //         type="email"
    //         id="email"
    //         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
    //         {...register('email', {
    //           required: 'Please enter an email',
    //           pattern: {
    //             value:
    //               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //             message: 'Not a valid email',
    //           },
    //         })}
    //       />
    //       {errors.email && (
    //         <div className="mt-2 text-xs text-red-600">
    //           {errors.email.message}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <span className="block w-full rounded-md shadow-sm">
    //       <button
    //         type="submit"
    //         className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
    //       >
    //         Send reset link
    //       </button>
    //     </span>
    //   </div>
    // </form>
  );
};
export default ResetPasswordForm;
