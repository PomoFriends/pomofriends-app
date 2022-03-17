import React, { useEffect, useState } from 'react';
import { GroupMessage } from '../../utils/types';
import DisplayMessages from './Display';
import { makeStyles } from '@mui/styles';
import { Box, List } from '@mui/material';
import { useGroup } from '../../hooks/useGroup';
import ChatForm from './Form';

const useStyles = makeStyles((theme: any) => ({
  messages: {
    overflow: 'auto',
    maxHeight: '36rem',
    height: '33.5rem',
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
}));

interface ChatProps {
  groupId: string;
}

const Chat: React.FC<ChatProps> = ({ groupId }) => {
  const classes = useStyles();
  const { getMessages } = useGroup();

  const [messages, setMessages] = useState<GroupMessage[]>([]);

  // automatically check db for new messages
  useEffect(() => {
    let isSubscribed = true;

    getMessages(groupId, setMessages, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Box className={classes.messages}>
        <List>
          {messages.map((message: GroupMessage) => (
            <div key={message.id}>
              <DisplayMessages message={message} />
            </div>
          ))}
        </List>
      </Box>
      <ChatForm groupId={groupId} />
    </>
  );
};

export default Chat;
