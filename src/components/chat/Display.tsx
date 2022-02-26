import React from 'react';
import { GroupMessage } from '../../utils/types';
import { ListItem, ListItemText, Divider } from '@mui/material';

interface DisplayMessageProps {
  message: GroupMessage;
}

const DisplayMessages: React.FC<DisplayMessageProps> = ({ message }) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={message.message} />
      </ListItem>
      <Divider />
    </>
  );
};

export default DisplayMessages;
