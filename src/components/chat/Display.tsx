import { UnstyledButton } from '@mantine/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MouseEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { GroupMessage } from '../../utils/types/groupTypes';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
  },
  deleteButton: {
    color: theme.palette.error.main,
    marginLeft: '0.1rem',
  },
  popover: {},
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
          <Typography>
            <Typography color={message.color} component="span" fontWeight={600}>
              {message.username}
            </Typography>
            : {message.message}
          </Typography>
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
                <UnstyledButton
                  style={{ width: '100%' }}
                  onClick={handleDelete}
                >
                  <ListItem className={classes.listItem}>
                    <Box className={classes.actionButton}>
                      <DeleteIcon />
                    </Box>
                    <Typography
                      position={'inherit'}
                      ml={'0.5rem'}
                      color={'primary'}
                    >
                      Delete
                    </Typography>
                  </ListItem>
                </UnstyledButton>
              ) : (
                <UnstyledButton style={{ width: '100%' }}>
                  <ListItem className={classes.listItem}>
                    <Box className={classes.actionButton}>
                      <FlagIcon color={'error'} />
                    </Box>
                    <Typography
                      position={'inherit'}
                      ml={'0.5rem'}
                      color={'error'}
                    >
                      Report
                    </Typography>
                  </ListItem>
                </UnstyledButton>
              )}
            </List>
          </Popover>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default DisplayMessages;
