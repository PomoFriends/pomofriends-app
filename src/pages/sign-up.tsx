import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Layout from '../components/elements/Layout';
import SignUpForm from '../components/forms/SignUpForm';
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
 * Sign up page
 */
const SignUpPage: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Layout>
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" color="white">
          Sign up
        </Typography>
        <FirebaseProviderAuth />
        <SignUpForm />
      </Box>
    </Layout>
  );
};
export default SignUpPage;
