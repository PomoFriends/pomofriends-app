import { Button as CoolButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Loader, Center } from '@mantine/core';

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
 * A button with loading.
 * Takes isLoading state and title
 */
const SubmitButton = ({
  isLoading,
  title,
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
        <Center my={5}>
          <Loader color="black" size="xl" variant="dots" />
        </Center>
      ) : (
        title
      )}
    </CoolButton>
  );
};
export default SubmitButton;
