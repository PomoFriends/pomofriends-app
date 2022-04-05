import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimerIcon from '@mui/icons-material/Timer';
import {
  Avatar,
  Box,
  Divider,
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
import { useParticipants } from '../../hooks/useParticipants';
import { GroupParticipant } from '../../utils/types/groupTypes';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UnstyledButton } from '@mantine/core';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
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
    justifyContent: 'center',
  },
}));

interface DisplayProps {
  participant: GroupParticipant;
  admin?: boolean;
  muted?: boolean;
  adminId: string;
  groupId: string;
}

const DisplayParticipant: React.FC<DisplayProps> = ({
  participant,
  admin,
  muted,
  adminId,
  groupId,
}) => {
  const classes = useStyles();
  const { changeAdmin, kickUser, muteUser, unmuteUser } = useParticipants();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openDetails = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDetails = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'group-details' : undefined;

  const handleChangeAdmin = () => {
    changeAdmin(groupId, participant.id);
    closeDetails();
  };

  const handleKickUser = () => {
    kickUser(groupId, participant.id);
    closeDetails();
  };

  const handleMute = () => {
    if (muted) {
      unmuteUser(participant.id);
    } else {
      muteUser(participant.id);
    }
    closeDetails();
  };

  let popover = null;

  if (user!.id === adminId) {
    popover = (
      <>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem className={classes.listItem}>
            <Box className={classes.actionButton}>
              <FlagIcon />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'primary'}>
              Report
            </Typography>
          </ListItem>
        </UnstyledButton>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem className={classes.listItem} onClick={handleMute}>
            <Box className={classes.actionButton}>
              <VisibilityOffIcon sx={{ color: 'yellow' }} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'yellow'}>
              {muted ? 'Unmute' : 'Mute'}
            </Typography>
          </ListItem>
        </UnstyledButton>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem
            className={classes.listItem}
            onClick={handleKickUser}
            sx={{ mb: '0.45rem' }}
          >
            <Box className={classes.actionButton}>
              <PersonRemoveIcon color={'error'} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'error'}>
              Kick
            </Typography>
          </ListItem>
        </UnstyledButton>
        <Divider />
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem
            className={classes.listItem}
            onClick={handleChangeAdmin}
            sx={{ mt: '0.45rem' }}
          >
            <Box className={classes.actionButton}>
              <TimerIcon color={'primary'} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'primary'}>
              Make Admin
            </Typography>
          </ListItem>
        </UnstyledButton>
      </>
    );
  } else {
    popover = (
      <>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem className={classes.listItem}>
            <Box className={classes.actionButton}>
              <FlagIcon />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'primary'}>
              Report
            </Typography>
          </ListItem>
        </UnstyledButton>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem className={classes.listItem} onClick={handleMute}>
            <Box className={classes.actionButton}>
              <VisibilityOffIcon sx={{ color: 'yellow' }} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'yellow'}>
              {muted ? 'Unmute' : 'Mute'}
            </Typography>
          </ListItem>
        </UnstyledButton>
      </>
    );
  }
  return (
    <>
      <ListItem
        classes={{
          container: classes.list,
        }}
      >
        <Box className={classes.box}>
          <Avatar alt={participant.username} src={participant.profilePic!} />
          <Typography
            sx={{
              marginLeft: '0.5rem',
              marginTop: '0.2rem',
              color: participant.color,
            }}
            variant="h6"
          >
            {participant.username}
          </Typography>
          {admin ? (
            <Box
              sx={{
                marginTop: '0.3rem',
              }}
              className={classes.actionButton}
            >
              <Tooltip title="admin">
                <TimerIcon />
              </Tooltip>
            </Box>
          ) : null}
        </Box>

        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          {participant.id === user!.id ? null : (
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
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                className={classes.popover}
              >
                <List sx={{ width: '10rem' }}>{popover}</List>
              </Popover>
            </>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default DisplayParticipant;
