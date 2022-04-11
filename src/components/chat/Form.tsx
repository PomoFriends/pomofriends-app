import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useChat } from '../../hooks/useChat';
import { ChatForm as Form } from '../../utils/types/formTypes';
import Filter from 'bad-words';
import { useEffect, useState } from 'react';
import { useInterval } from '../../utils/useInterval';
import { notification } from '../../utils/notification';

const useStyles: any = makeStyles((theme: any) => ({
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
  const classes: any = useStyles();
  const filter = new Filter();

  const { sendMessage } = useChat();

  const { handleSubmit, control, reset } = useForm<Form>();

  const [messages, setMessages] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);
  const [limited, setLimited] = useState<boolean>(false);
  const [timeLimited, setTimeLimited] = useState<number>(0);

  useInterval(
    () => {
      if (limited) {
        setTimeLimited(timeLimited - 1);
      }
      setTime(time + 1);
    },
    true ? 1000 : null
  );

  useEffect(() => {
    if (time === 10) {
      setMessages([]);
      setTime(0);
    }
    if (timeLimited === 0) {
      setLimited(false);
    }
  }, [time, timeLimited]);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    reset({
      message: '',
    });

    if (data.message.length === 0) {
      return;
    }

    try {
      filter.clean(data.message);
    } catch {
      return;
    }

    if (messages.length < 6) {
      setMessages((messages) => [...messages, data.message]);
    } else {
      setLimited(true);
      setTimeLimited(15);
      notification({
        title: 'Please, do not spam',
        message: '',
        color: 'red',
      });
    }

    return await sendMessage({
      message: filter.clean(data.message),
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
            <>
              {limited ? (
                <TextField
                  autoComplete="off"
                  className={classes.textField}
                  fullWidth
                  label={`You can chat in ${timeLimited} seconds`}
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  sx={{ border: 0 }}
                  disabled={limited}
                />
              ) : (
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
                  disabled={limited}
                />
              )}
            </>
          )}
          rules={{
            maxLength: {
              value: 500,
              message: 'Should have less than 500 characters',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={limited}
        >
          <SendIcon />
        </Button>
      </form>
    </Box>
  );
};

export default ChatForm;
