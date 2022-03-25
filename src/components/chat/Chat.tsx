import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Fab, List, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { GroupMessage } from '../../utils/types/groupTypes';
import DisplayMessages from './Display';
import ChatForm from './Form';

const useStyles = makeStyles(() => ({
  messages: {
    overflow: 'auto',
    maxHeight: '30rem',
    height: '30rem',
    marginBottom: '0.5rem',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
      borderRadius: 8,
    },
  },
  fab: {
    // margin: 0,
    top: 'auto',
    left: 'auto',
    right: '1rem',
    bottom: '4rem',
  },
}));

interface ChatProps {
  groupId: string;
}

const Chat: React.FC<ChatProps> = ({ groupId }) => {
  const classes = useStyles();
  const { getMessages } = useChat();

  const [scrollUp, setScrollUp] = useState(false);
  const [messages, setMessages] = useState<GroupMessage[]>([]);

  const messageEl = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    if (!scrollUp) {
      if (messageEl) {
        if (messageEl.current) {
          messageEl.current.scrollIntoView({ behavior: 'auto' });
        }
      }
    }
  };

  const handleScroll = (e: any) => {
    const element = e.target;
    if (
      element.scrollHeight - element.scrollTop - 200 >=
      element.clientHeight
    ) {
      if (!scrollUp) {
        setScrollUp(true);
      }
    }
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (scrollUp) {
        setScrollUp(false);
      }
    }
  };

  const toggleAutoScroll = () => {
    if (messageEl) {
      if (messageEl.current) {
        messageEl.current.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  // automatically check db for new messages
  useEffect(() => {
    let isSubscribed = true;

    getMessages(groupId, setMessages, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box className={classes.messages} onScroll={handleScroll}>
        <List>
          {messages.map((message: GroupMessage) => {
            return (
              <div key={message.id}>
                <DisplayMessages message={message} groupId={groupId} />
              </div>
            );
          })}
        </List>
        <div ref={messageEl} />
        {scrollUp ? (
          <Tooltip title="Auto Scroll">
            <Fab
              className={classes.fab}
              sx={{ position: 'absolute' }}
              aria-label="auto-scroll"
              color="primary"
              onClick={toggleAutoScroll}
            >
              <KeyboardArrowDownIcon />
            </Fab>
          </Tooltip>
        ) : null}
      </Box>

      <ChatForm groupId={groupId} />
    </Box>
  );
};

export default Chat;
