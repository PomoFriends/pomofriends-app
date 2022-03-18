import React, { useState, MouseEvent } from 'react';
import { GroupMessage } from '../../utils/types';
import {
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
  List,
  Popover,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
  },
  deleteButton: {
    color: theme.palette.error.main,
    marginLeft: '0.1rem',
  },
  popover: {
    '& .MuiPopover-paper': {
      border: '1px solid black',
      borderColor: theme.palette.secondary.main,
    },
  },
  listItem: {
    fontSize: '0.90rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
}));
interface DisplayMessageProps {
  message: GroupMessage;
  groupId: string;
}

const DisplayMessages: React.FC<DisplayMessageProps> = ({
  message,
  groupId,
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { deleteMessage } = useChat();

  const handleDelete = async () => {
    await deleteMessage(message, groupId);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openDetails = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDetails = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-details' : undefined;

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="action">
              <IconButton
                edge="end"
                onClick={openDetails}
                aria-label="action-button"
                className={classes.actionButton}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={closeDetails}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className={classes.popover}
            >
              <List>
                <ListItem className={classes.listItem}>
                  Report
                  <Box className={classes.actionButton}>
                    <FlagIcon />
                  </Box>
                </ListItem>

                {user!.id === message.userId ? (
                  <>
                    <Divider />
                    <ListItem
                      className={classes.listItem}
                      onClick={handleDelete}
                    >
                      Delete
                      <Box className={classes.deleteButton}>
                        <DeleteIcon />
                      </Box>
                    </ListItem>
                  </>
                ) : null}
              </List>
            </Popover>
          </>
        }
      >
        <Box sx={{ color: message.color, marginRight: '0.25rem' }}>
          {message.username}:
        </Box>
        <ListItemText primary={message.message} />
      </ListItem>
      <Divider />
    </>
  );
};

export default DisplayMessages;
