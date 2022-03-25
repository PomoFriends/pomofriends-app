import { Button as CoolButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Spinner from '../images/Spinner';

const useStyles = makeStyles((theme: any) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ButtonProps {
  title?: any;
  isLoading?: boolean;
}

/**
 *
 * @param {any} title
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
