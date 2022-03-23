import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useChat } from '../../hooks/useChat';
import { ChatForm as Form } from '../../utils/types';

const useStyles = makeStyles((theme: any) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
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
  button: {
    marginLeft: '0.3rem',
    minWidth: '1rem',
    minHeight: '3.5rem',
  },
}));

interface ChatFormProps {
  groupId: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ groupId }) => {
  const classes = useStyles();

  const { sendMessage } = useChat();

  const { handleSubmit, control, reset } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    reset({
      message: '',
    });

    return await sendMessage({
      message: data.message,
      groupId,
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete="off"
              className={classes.textField}
              fullWidth
              label="Send message"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              sx={{ border: 0 }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </Box>
  );
};

export default ChatForm;
