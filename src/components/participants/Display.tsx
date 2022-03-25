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
import { GroupParticipant } from '../../utils/types/groupTypes';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
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
    justifyContent: 'center',
  },
}));

interface DisplayProps {
  participant: GroupParticipant;
  admin?: boolean;
}

const DisplayParticipant: React.FC<DisplayProps> = ({ participant, admin }) => {
  const classes = useStyles();

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
              <ListItem className={classes.listItem}>
                Report
                <Box className={classes.actionButton}>
                  <FlagIcon />
                </Box>
              </ListItem>
            </List>
          </Popover>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default DisplayParticipant;
