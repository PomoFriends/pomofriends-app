import React, { useState, MouseEvent } from 'react';
import { GroupMessage } from '../../utils/types';
import {
  ListItem,
  ListItemSecondaryAction,
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
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
  list: {
    minHeight: '1.5rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
    '&:hover $listItemSecondaryAction': {
      visibility: 'inherit',
    },
  },
  listItemSecondaryAction: {
    visibility: 'hidden',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
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
        sx={{ paddingTop: 0, paddingBottom: 0 }}
        classes={{
          container: classes.list,
        }}
      >
        <Box className={classes.box}>
          <Box
            sx={{
              color: message.color,
              marginRight: '0.25rem',
            }}
          >
            {message.username}:
          </Box>
          <Box>{message.message}</Box>
        </Box>
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
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
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            className={classes.popover}
          >
            <List>
              {user!.id === message.userId ? (
                <>
                  <ListItem className={classes.listItem} onClick={handleDelete}>
                    Delete
                    <Box className={classes.deleteButton}>
                      <DeleteIcon />
                    </Box>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem className={classes.listItem}>
                    Report
                    <Box className={classes.actionButton}>
                      <FlagIcon />
                    </Box>
                  </ListItem>
                </>
              )}
            </List>
          </Popover>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default DisplayMessages;
