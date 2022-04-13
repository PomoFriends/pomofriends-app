import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Fab, List, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { GroupMessage } from '../../utils/types/groupTypes';
import DisplayMessages from './Display';
import ChatForm from './Form';
import { ScrollArea } from '@mantine/core';

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

  const [scrollUp, setScrollUp] = useState(false);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<GroupMessage[]>([]);

  const viewport = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollUp) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (viewport.current) {
      if (
        viewport.current.scrollHeight - viewport.current.scrollTop - 100 >=
        scrollPosition.y
      ) {
        setScrollUp(true);
      }
      if (
        viewport.current.scrollHeight - viewport.current.clientHeight ===
        viewport.current.scrollTop
      ) {
        setScrollUp(false);
      }
    }
  }, [scrollPosition]);

  const scrollToBottom = () => {
    if (viewport.current)
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'auto',
      });
  };

  const handleToggleScroll = () => {
    setScrollUp(false);
    scrollToBottom();
  };

  // const handleScroll = (e: any) => {
  //   const element = e.target;
  //   if (
  //     element.scrollHeight - element.scrollTop - 200 >=
  //     element.clientHeight
  //   ) {
  //     if (!scrollUp) {
  //       setScrollUp(true);
  //     }
  //   }
  //   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //     if (scrollUp) {
  //       setScrollUp(false);
  //     }
  //   }
  // };

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
      <Box>
        <ScrollArea
          style={{ height: '30rem' }}
          mb={'0.45rem'}
          viewportRef={viewport}
          onScrollPositionChange={onScrollPositionChange}
        >
          <List>
            {messages.map((message: GroupMessage) => (
              <div key={message.id}>
                {mutedUsers.includes(message.userId) ? null : (
                  <>
                    {message.userId === '5wLyG0ZNob0pq4M2sgSXpomoBot' ? null : (
                      <DisplayMessages message={message} groupId={groupId} />
                    )}
                  </>
                )}
              </div>
            ))}
          </List>
        </ScrollArea>
        {scrollUp ? (
          <Tooltip title="Auto Scroll">
            <Fab
              className={classes.fab}
              sx={{ position: 'absolute' }}
              aria-label="auto-scroll"
              color="primary"
              onClick={handleToggleScroll}
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
