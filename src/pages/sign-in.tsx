import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Layout from '../components/elements/Layout';
import SignInForm from '../components/auth/SignInForm';
import FirebaseProviderAuth from '../hooks/firebaseProviderAuth';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

/**
 *
 * @return {JSX.Element}
 *
 * Sign in page
 */
const SignInPage: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Layout>
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" color="white">
          Sign in
        </Typography>
        <FirebaseProviderAuth />
        <SignInForm />
      </Box>
    </Layout>
  );
};
export default SignInPage;
