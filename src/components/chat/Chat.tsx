import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Fab, List, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { GroupMessage } from '../../utils/types/groupTypes';
import DisplayMessages from './Display';
import ChatForm from './Form';
import { ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';

const useStyles = makeStyles(() => ({
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
  mutedUsers: string[];
}

const Chat: React.FC<ChatProps> = ({ groupId, mutedUsers }) => {
  const classes = useStyles();
  const { getMessages } = useChat();

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
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
          // messageEl.current.scrollIntoView({ behavior: 'auto' });
          scrollIntoView();
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
      <Box onScroll={handleScroll} ref={scrollableRef}>
        <ScrollArea style={{ height: '30rem' }} mb={'0.45rem'}>
          <List>
            {messages.map((message: GroupMessage) => (
              <div key={message.id}>
                {mutedUsers.includes(message.userId) ? null : (
                  <DisplayMessages message={message} groupId={groupId} />
                )}
              </div>
            ))}
          </List>

          <Box ref={targetRef} />
        </ScrollArea>
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
