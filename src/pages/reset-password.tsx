import React from 'react';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../components/elements/Layout';

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
 * Reset password page
 */
const ResetPasswordPage: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Layout>
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" color="white">
          Reset password
        </Typography>
        <ResetPasswordForm />
      </Box>
    </Layout>
  );
};
export default ResetPasswordPage;
