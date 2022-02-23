import React from 'react';
import Spinner from '../images/Spinner';
import { Button as CoolButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ButtonProps {
  title?: string;
  isLoading?: boolean;
}

/**
 *
 * @param {string} title
 * @param {isLoading} boolean
 * @return {JSF.Element}
 *
 * A button with the loading spinner.
 * Takes isLoading state and title
 */
const SubmitButton = ({
  isLoading,
  title,
  children,
  ...buttonProps
}: ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  const classes = useStyles();

  return (
    <CoolButton
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {isLoading ? (
        <Spinner width="20" fill="white" className="animate-spin" />
      ) : (
        title
      )}
    </CoolButton>
  );
};
export default SubmitButton;
